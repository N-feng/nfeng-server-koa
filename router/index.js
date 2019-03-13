const Router = require('koa-router')
const admin_router = require('./admin/index') // 后台
const login_router = require('./auth/index')  // 登录
const global_router = require('./global/index') // 全局

const router = new Router({
    // prefix: '/api'
})

router.all('*', async (ctx, next) => {
    // 允许来自所有域名请求
    ctx.set('Access-Control-Allow-Origin', '*');
    // 是否允许发送Cookie，ture为运行
    ctx.set('Access-Control-Allow-Credentials', true);
    // 设置所允许的HTTP请求方法
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
    // 服务器支持的所有头信息字段，多个字段用逗号分隔
    ctx.set('Access-Control-Allow-Headers', 'x-requested-with, x-ui-request, lang');
    await next();  
});  

router.get('/', async function (ctx, next) {
    const filePath = './views/index.html'
    ctx.sendHtmlFile(filePath)
})

router.use(admin_router.routes(), admin_router.allowedMethods())
router.use(login_router.routes(), login_router.allowedMethods())
router.use(global_router.routes(), global_router.allowedMethods())

module.exports = router
