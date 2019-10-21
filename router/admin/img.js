const Router = require('koa-router')
const ImgDB = require('../../mongodb/ImgDB')
const { auth, validator, tool } = require('../../utils')

/**
 * 路由对象
 * @type {Router}
 */
const router = new Router({
  prefix: '/img'
})

router.get('/add', async (ctx) => {
  validator.isStrings(ctx, ['url'])
  const { url } = ctx.vals
  const imgData = await ImgDB.find({ url })
  if (imgData) {
    throw { code: 500, msg: 'This item already exists' }
  }
  const payload = auth.verify(ctx)
  const { username } = payload.data
  await ImgDB.add({ url, username })
  const data = { url, username }
  tool.sendSuccess(ctx, data, 'add success')
})

router.get('/delete', async (ctx) => {
  validator.isStrings(ctx, ['imgId'])
  const { imgId } = ctx.vals
  const imgData = await ImgDB.delete(imgId)
  const { name, url, username } = imgData
  const data = { name, url, username }
  tool.sendSuccess(ctx, data, 'delete success')
})

router.get('/find', async (ctx) => {
  validator.isStrings(ctx, ['imgId'])
  const { imgId } = ctx.vals
  const imgData = await ImgDB.find({ _id: imgId })
  const { name, url, username } = imgData
  const data = { name, url, username }
  tool.sendSuccess(ctx, data)
})

router.get('/list', async (ctx) => {
  const imgList = await ImgDB.list()
  const data = imgList.map(item => {
    const { name, url, username } = item
    const imgId = item._id
    return { imgId, name, url, username }
  })
  tool.sendSuccess(ctx, data)
})

module.exports = router
