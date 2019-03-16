const Router = require('koa-router')
const admin_router = require('./admin/index') // 后台
const login_router = require('./auth/index')  // 登录
const global_router = require('./global/index') // 全局

const router = new Router({
    // prefix: '/api'
})

router.get('/', async function (ctx, next) {
    const filePath = './views/index.html'
    ctx.sendHtmlFile(filePath)
})

// router.use(admin_router.routes(), admin_router.allowedMethods())
router.use(login_router.routes(), login_router.allowedMethods())
router.use(global_router.routes(), global_router.allowedMethods())

module.exports = router
