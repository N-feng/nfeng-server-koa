const Router = require('koa-router');
const role_router = require('./role'); // 角色
const user_router = require('./auth');  // 用户
const img_router = require('./img'); // 图片

const router = new Router({
    // prefix: '/api'
});

router.get('/', async function (ctx, next) {
    const filePath = './views/index.html'
    ctx.sendHtmlFile(filePath)
});

router.use(role_router.routes(), role_router.allowedMethods());
router.use(user_router.routes(), user_router.allowedMethods());
router.use(img_router.routes(), img_router.allowedMethods());

module.exports = router;
