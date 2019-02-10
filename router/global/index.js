const Router = require('koa-router')
const Server = require('./server')
const Check = require('./check')

/**
 * 路由对象
 * @type {Router}
 */
const router = new Router({
    prefix: '/global'
})

/**
 * 获取凭证
 */
router.get('/getAuthorization', async (ctx) => {
    Check.getAuthorization(ctx)
    const data = await Server.getAuthorization(ctx)
    ctx.sendSuccess(data)
})

/**
 * 获取cdn上传地址
 */
router.get('/getCdnUpload', async (ctx) => {
    Check.getCdnUpload(ctx)
    const data = await Server.getCdnUpload(ctx)
    ctx.sendSuccess(data)
})

/**
 * 获取签名
 */
router.get('/getSignature', async (ctx) => {
    Check.getSignature(ctx)
    const data = await Server.getSignature(ctx)
    ctx.sendSuccess(data)
})

module.exports = router
