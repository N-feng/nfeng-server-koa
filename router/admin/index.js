const Router = require('koa-router');
const ErrorCode = require('../../config/errorCode');
const { getData } = require('../../lib/jsonwebtoken');

const router = new Router({
    prefix: '/admin'
});

// =============================  子路由  ==============================
const account_router = require('./account/index');

// 数据拦截判断用户类型
router.all('*', async (ctx, next) => {
    const token = ctx.request.header.token;
    const userData = await getData(token);
    // 重新刷新数据
    if (userData.type === 1) {
        throw ErrorCode.admin.admin_err
    }
    await next();
});

router.use(account_router.routes(), account_router.allowedMethods());

module.exports = router;