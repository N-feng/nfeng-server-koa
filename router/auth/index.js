const Router = require('koa-router');
const Server = require('./server');
const Check = require('./check');
const UserMongodb = require('../../mongodb/auth');
const MD5 = require('../../lib/md5');

const router = new Router({
    prefix: '/auth'
});

// 添加用户
router.post('/signup', async (ctx) => {
    // Check.signup(ctx);
    // const data = await Server.signup(ctx);
    // ctx.sendSuccess(data, '创建成功!');
    ctx.isStrings(['username','password','roleName']);
    const { username, password, roleName } = ctx.vals;
    const MD5password = MD5(password);
    const userData = await UserMongodb.findUser(username);
    console.log(roleName);
    if (userData) {
        throw ErrorCode.admin.user_exist;
    }
    const data = await UserMongodb.addUser(username, MD5password, roleName);
    ctx.sendSuccess(data, '创建成功!');
});

// 登录接口
router.post('/login', async (ctx) => {
    Check.login(ctx);
    const data = await Server.login(ctx);
    ctx.sendSuccess(data, '登录成功!');
});

// 数据拦截判断用户类型
router.all('*', async (ctx, next) => {
    Check.getUser(ctx);
    await Server.getUser(ctx);
    await next();
});

// 删除用户
router.post('/delete', async (ctx) => {
    Check.delete(ctx);
    const data = await Server.delete(ctx);
    ctx.sendSuccess(data, '删除成功!');
});

// 获取用户信息
router.post('/info', async (ctx) => {
    Check.getUser(ctx);
    const data = await Server.getUser(ctx);
    ctx.sendSuccess(data);
});

// 获取用户列表信息
router.post('/list', async (ctx) => {
    // Check.getList(ctx);
    // const data = await Server.getList(ctx);
    // ctx.sendSuccess(data);
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
