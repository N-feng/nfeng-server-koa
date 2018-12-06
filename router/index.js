const Router = require('koa-router');
const admin_router = require('./admin/index');
const login_router = require('./auth/index');

const router = new Router({
    // prefix: '/api'
});

router.use(admin_router.routes(), admin_router.allowedMethods());
router.use(login_router.routes(), login_router.allowedMethods());

module.exports = router;
