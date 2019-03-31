const Router = require('koa-router');
const ErrorCode = require('../../config/errorCode');
const { getData } = require('../../lib/jsonwebtoken');

const router = new Router({
    // prefix: '/admin'
});

// =============================  子路由  ==============================
const account_router = require('./account/index');

router.use(account_router.routes(), account_router.allowedMethods());

module.exports = router;
