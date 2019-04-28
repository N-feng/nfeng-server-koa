const Router = require('koa-router');
const Server = require('./server');
const Check = require('./check');

const router = new Router({
    prefix: '/role',
});

router.post('/list', async (ctx) => {
    Check.getList(ctx);
    const data = await Server.getList(ctx);
    ctx.sendSuccess(data);
})

module.exports = router;