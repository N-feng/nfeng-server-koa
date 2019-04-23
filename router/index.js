const Router = require('koa-router')
const user_router = require('./user/index')  // 用户
const global_router = require('./global/index') // 全局

const router = new Router({
    // prefix: '/api'
})

router.get('/', async function (ctx, next) {
    const filePath = './views/index.html'
    ctx.sendHtmlFile(filePath)
})

router.use(user_router.routes(), user_router.allowedMethods())
router.use(global_router.routes(), global_router.allowedMethods())

module.exports = router
