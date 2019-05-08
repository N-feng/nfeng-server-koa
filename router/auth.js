const Router = require('koa-router');
const UserMongodb = require('../mongodb/auth');
const RoleMongodb = require('../mongodb/role');
const MD5 = require('../lib/md5');

const router = new Router({
    prefix: '/auth'
});

// 添加用户
router.post('/signup', async (ctx) => {
    ctx.isStrings(['username','password','roleName']);
    const { username, password, roleName } = ctx.vals;
    const MD5password = MD5(password);
    const userData = await UserMongodb.findUser(username);
    if (userData) {
        throw { code: 10001, msg: '用户已经存在' };
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
        throw { code: 10002, msg: '用户不存在' };
    }
    if (userData.loginErrNum > 111) {
        throw { code: 10006, msg: '登录错误次数超出上限' };
    }
    if (MD5password != userData.password) {
        UserMongodb.addLoginErr(userData);
        throw { code: 10003, msg: '账号或者密码错误' };
    }
    UserMongodb.clearLoginErr(userData);
    console.log(userData);
    const token = ctx.getToken(userData);
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
    ctx.getUser(ctx);
    await next();
});

// 删除用户
router.post('/delete', async (ctx) => {
    ctx.isStrings(['username','password']);
    const { username } = ctx.vals;
    const user = await UserMongodb.delete(username);
    if (!user) {
        throw { code: 10002, msg: '用户不存在' };
    }
    const data = {
        username: user.username
    }
    ctx.sendSuccess(data, '删除成功!');
});

// 获取用户信息
router.post('/info', async (ctx) => {
    const user = await ctx.getUser(ctx);
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
