const Router = require('koa-router');
const role_router = require('./role/index'); // 角色
const user_router = require('./auth/index');  // 用户
const global_router = require('./global/index'); // 全局

const router = new Router({
    // prefix: '/api'
});

router.get('/', async function (ctx, next) {
    const filePath = './views/index.html'
    ctx.sendHtmlFile(filePath)
});

router.use(role_router.routes(), role_router.allowedMethods());
router.use(user_router.routes(), user_router.allowedMethods());
router.use(global_router.routes(), global_router.allowedMethods());

module.exports = router;
