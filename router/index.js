const Router = require('koa-router');

const router = new Router({
    // prefix: '/api'
});

const admin_router = require('./admin/index')

router.get('/', async function (ctx, next) {
    const filePath = './views/index.html'
    ctx.sendHtmlFile(filePath)
});

router.use(admin_router.routes(), admin_router.allowedMethods())

module.exports = router;
