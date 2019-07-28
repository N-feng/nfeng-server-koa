const Router = require('koa-router')
const role_router = require('./role') // 角色
const user_router = require('./auth')  // 用户
const img_router = require('./img') // 图片
const task_router = require('./task') // 任务
const global_router = require('./global') // 全部
const RoleMongodb = require('../../mongodb/role')

const router = new Router({
  prefix: '/admin'
})

// 数据拦截判断用户类型
router.all('*', async (ctx, next) => {
  const { url } = ctx.request
  const whiteList = ['/admin/auth/login', '/admin/auth/signup']
  if (whiteList.some(item => item === url)) {
    await next()
    return
  }
  const userData = await ctx.getUser(ctx)
  const { roleName } = userData
  const roleData = await RoleMongodb.findRole(roleName)
  if (!roleData) {
    throw { code: 500, msg: '角色不存在' };
  } else {
    const { permissions } = roleData
    if (permissions.some(item => item === url)) {
      await next()
    } else {
      throw { code: '500', msg: '您没有权限访问此接口哦~' }
    }
  }
})

router.use(user_router.routes(), user_router.allowedMethods())
router.use(role_router.routes(), role_router.allowedMethods())
router.use(img_router.routes(), img_router.allowedMethods())
router.use(task_router.routes(), task_router.allowedMethods())
router.use(global_router.routes(), global_router.allowedMethods())

module.exports = router