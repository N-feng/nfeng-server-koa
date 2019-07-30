const Router = require('koa-router')
const Server = require('../global/server')
const Check = require('../global/check')
const ImgCos = require('../../lib/cos/img')
const cdnUrl = 'https://cdn.nfeng.net.cn/upload/'

/**
 * 路由对象
 * @type {Router}
 */
const router = new Router({
    prefix: '/img'
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
router.post('/getSignature', async (ctx) => {
    Check.getSignature(ctx)
    const data = await Server.getSignature(ctx)
    ctx.sendSuccess(data)
})

router.post('/add', async (ctx) => {
    const { file } = ctx.request.files
    const { fileName } = ctx.request.body
    const fileData = await ImgCos.addImg(file, fileName)
    console.log(fileData)
    const data = {
        url: cdnUrl + fileName,
        name: fileName,
    }
    ctx.sendSuccess(data, '上传成功~')
})

router.post('/delete', async (ctx) => {
    ctx.isStrings(['fileName'])
    const { fileName } = ctx.vals
    const fileData = await ImgCos.deleteImg(fileName)
    console.log(fileData)
    const data = {
        url: cdnUrl + fileName,
        name: fileName,
    }
    ctx.sendSuccess(data, '删除成功~')
})

/**
 * 获取桶列表
 */
router.post('/list', async (ctx) => {
    const imgList = await ImgCos.getImgList();
    const data = imgList.map(item => {
        const name = item.Key.replace('upload/', '')
        const url = cdnUrl + name
        const thumbUrl = cdnUrl + name
        return {
            name,
            status: 'done',
            url,
            thumbUrl,
        }
    })
    ctx.sendSuccess(data);
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
