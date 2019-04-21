const Router = require('koa-router');
const Server = require('./server');
const Check = require('./check');

const router = new Router({
    prefix: '/auth'
});

// 添加用户
router.post('/signup', async (ctx) => {
    Check.signup(ctx);
    const data = await Server.signup(ctx);
    ctx.sendSuccess(data, '创建成功!');
});

// 登录接口
router.post('/login', async (ctx) => {
    Check.login(ctx);
    const data = await Server.login(ctx);
    ctx.sendSuccess(data, '登录成功!');
});

// 删除用户
router.post('/delUser', async (ctx) => {
    Check.delUser(ctx);
    const data = await Server.delUser(ctx);
    ctx.sendSuccess(data, '删除成功!');
});

// ===========================  数据拦截  =================================
// 判断用户是否登录
router.all('*', async (ctx, next) => {
    Check.intercept(ctx);
    await Server.intercept(ctx);
    await next()
});

// 退出登录
router.get('/logOut', async (ctx) => {
    Check.logOut(ctx);
    await Server.logOut(ctx);
    ctx.sendSuccess('', '退出成功');
});

// 获取用户信息
router.get('/getUserInfo', async (ctx) => {
    Check.getUserInfo(ctx);
    const data = await Server.getUserInfo(ctx);
    ctx.sendSuccess(data);
});

module.exports = router;
