const Router = require('koa-router');
const UserMongodb = require('../mongodb/auth');
const RoleMongodb = require('../mongodb/role');

const router = new Router({
    prefix: '/auth'
});

// 添加用户
router.post('/signup', async (ctx) => {
    ctx.isStrings(['username','password','roleName']);
    const { username, password, roleName } = ctx.vals;
    const MD5password = ctx.MD5(password);
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
    const MD5password = ctx.MD5(password);
    const userData = await UserMongodb.findUser(username);
    const { avatar, roleName, loginErrNum } = userData;
    if (!userData) {
        throw { code: 10002, msg: '用户不存在' };
    }
    if (loginErrNum > 111) {
        throw { code: 10006, msg: '登录错误次数超出上限' };
    }
    if (MD5password != userData.password) {
        UserMongodb.addLoginErr(userData);
        throw { code: 10003, msg: '账号或者密码错误' };
    }
    UserMongodb.clearLoginErr(userData);
    const roleData = await RoleMongodb.findRole(roleName);
    const { roleMenu, permissions } = roleData;
    const roleMenuList = ctx.getRoleMenuList(roleMenu);
    const tokenData = Object.assign({}, { username, avatar }, { roleMenu, roleMenuList, permissions});
    const token = ctx.getToken(tokenData);
    const data = {
        ...tokenData,
        token,
    }
    ctx.sendSuccess(data, '登录成功!');
});

// 数据拦截判断用户类型
router.all('*', async (ctx, next) => {
    const userData = await ctx.getUser(ctx);
    // const { permissions } = userData;
    // ctx.checkApi(ctx, permissions);
    await next();
});

// 删除用户
router.post('/delete', async (ctx) => {
    ctx.isStrings(['username','password']);
    const { username } = ctx.vals;
    const userData = await UserMongodb.delete(username);
    if (!userData) {
        throw { code: 10002, msg: '用户不存在' };
    }
    const data = {
        username: userData.username
    }
    ctx.sendSuccess(data, '删除成功!');
});

// 获取用户信息
router.post('/info', async (ctx) => {
    const userData = await ctx.getUser(ctx);
    ctx.sendSuccess(userData);
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
