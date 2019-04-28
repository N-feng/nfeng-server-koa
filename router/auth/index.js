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
    Check.getList(ctx);
    const data = await Server.getList(ctx);
    ctx.sendSuccess(data);
});

module.exports = router;
