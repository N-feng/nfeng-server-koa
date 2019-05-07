const Router = require('koa-router');
const UserMongodb = require('../mongodb/auth');
const RoleMongodb = require('../mongodb/role');
const ErrorCode = require('../config/errorCode');
const MD5 = require('../lib/md5');
const Token = require('../lib/token');

const router = new Router({
    prefix: '/auth'
});

async function getUser (ctx) {
    const token = ctx.request.header.token;
    const user = await Token.getUser(token);
    return user;
}

// 添加用户
router.post('/signup', async (ctx) => {
    ctx.isStrings(['username','password','roleName']);
    const { username, password, roleName } = ctx.vals;
    const MD5password = MD5(password);
    const userData = await UserMongodb.findUser(username);
    if (userData) {
        throw ErrorCode.admin.user_exist;
    }
    const data = await UserMongodb.addUser(username, MD5password, roleName);
    ctx.sendSuccess(data, '创建成功!');
});

// 登录接口
router.post('/login', async (ctx) => {
    ctx.isStrings(['username','password']);
    const { username, password } = ctx.vals;
    const MD5password = MD5(password);
    const userData = await UserMongodb.findUser(username);
    if (!userData) {
        throw ErrorCode.admin.user_nonentity;
    }
    if (userData.loginErrNum > 111) {
        throw ErrorCode.admin.login_max;
    }
    if (MD5password != userData.password) {
        UserMongodb.addLoginErr(userData);
        throw ErrorCode.admin.login_err;
    }
    UserMongodb.clearLoginErr(userData);
    const token = Token.getToken(userData);
    const resData = {
        username: userData.username,
        avatar: userData.avatar
    };
    const data = {
        token,
        ...resData
    }
    ctx.sendSuccess(data, '登录成功!');
});

// 数据拦截判断用户类型
router.all('*', async (ctx, next) => {
    await getUser(ctx);
    await next();
});

// 删除用户
router.post('/delete', async (ctx) => {
    ctx.isStrings(['username','password']);
    const { username } = ctx.vals;
    const user = await UserMongodb.delete(username);
    if (!user) {
        throw ErrorCode.admin.user_nonentity;
    }
    const data = {
        username: user.username
    }
    ctx.sendSuccess(data, '删除成功!');
});

// 获取用户信息
router.post('/info', async (ctx) => {
    const user = await getUser(ctx);
    const roleName = user.roleName;
    const roleData = await RoleMongodb.findRole(roleName);
    const data = {
        username: user.username,
        menuList: roleData.roleMenuList,
    };
    ctx.sendSuccess(data);
});

// 获取用户列表信息
router.post('/list', async (ctx) => {
    const userList = await UserMongodb.findList();
    const data = userList.map(item => {
        return {
            username: item.username,
            roleName: item.roleName,
        }
    });
    ctx.sendSuccess(data);
});

module.exports = router;
