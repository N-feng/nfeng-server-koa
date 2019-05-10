const Router = require('koa-router')
const Server = require('./global/server')
const Check = require('./global/check')

/**
 * 路由对象
 * @type {Router}
 */
const router = new Router({
    prefix: '/global'
})

router.all('*', async (ctx, next) => {
    ctx.getUser(ctx);
    await next();
});

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
router.post('/getSignature', async (ctx) => {
    Check.getSignature(ctx)
    const data = await Server.getSignature(ctx)
    ctx.sendSuccess(data)
})

/**
 * 获取桶列表
 */
router.get('/getBucketList', async (ctx) => {
    ctx.isStrings(['Prefix']);
    const data = await Server.getBucketList(ctx)
    ctx.sendSuccess(data)
})

/**
 * 删除文件
 */
router.get('/deleteObject', async (ctx) => {
    Check.deleteObject(ctx)
    const data = await Server.deleteObject(ctx)
    ctx.sendSuccess(data, '删除成功!')
})

module.exports = router
