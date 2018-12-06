const Router = require('koa-router');
const Check = require('./check');
const Server = require('./server');

const router = new Router({
    // prefix: '/'
});

// 获取用户列表信息
router.get('/getUserList', async (ctx) => {
    Check.getUserList(ctx);
    const data = await Server.getUserList(ctx);
    ctx.sendSuccess(data);
});

module.exports = router;