const Router = require('koa-router')
const Server = require('./server')
const Check = require('./check')

/**
 * 路由对象
 * @type {Router}
 */
const router = new Router({
    prefix: '/menu'
})

/**
 * 获取菜单
 */
router.post('/getMenu', async (ctx) => {
    Check.getMenu(ctx)
    const data = await Server.getMenu(ctx)
    ctx.sendSuccess(data)
})

module.exports = router