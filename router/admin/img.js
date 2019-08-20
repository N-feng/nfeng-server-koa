const Router = require('koa-router')
const ImgCos = require('../../lib/cos/img')
const cdnUrl = 'https://cdn.nfeng.net.cn/upload/'
const send = require('koa-send')
const fs = require('fs')

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

router.get('/get', async (ctx) => {
    ctx.isStrings(['fileName'])
    const { fileName } = ctx.vals
    const fileData = await ImgCos.getImg(fileName)
    console.log(fileData)
    // const path = './static/upload/' + fileName
    const htmlFile = await (new Promise(function (resolve, reject) {
        fs.readFile('./static/upload/' + fileName, (err, data) => {
            if (err) {
                console.log('err')
                reject(err)
            } else {
                console.log('success')
                resolve(data)
            }
        })
    }))
    // ctx.type = 'html';
    // console.log(htmlFile)
    ctx.set({
        'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件  
        'Content-Disposition': 'attachment; filename=' + fileName, //告诉浏览器这是一个需要下载的文件  
    });
    ctx.body = htmlFile
    // ctx.body = fs.createReadStream('./static/upload/' + fileName)
    // ctx.attachment(path)
    // console.log(ctx.path)
    // await send(ctx, path)
    // ctx.sendSuccess(data)
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
