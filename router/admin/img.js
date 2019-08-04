const Router = require('koa-router')
const ImgCos = require('../../lib/cos/img')
const cdnUrl = 'https://cdn.nfeng.net.cn/upload/'

/**
 * 路由对象
 * @type {Router}
 */
const router = new Router({
    prefix: '/img'
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

module.exports = router
