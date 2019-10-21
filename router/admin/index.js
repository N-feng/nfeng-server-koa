const Router = require('koa-router');
const role_router = require('./role'); // 角色
const user_router = require('./auth'); // 用户
const img_router = require('./img'); // 图片
const task_router = require('./task'); // 任务
const note_router = require('./note'); // 笔记
const project_router = require('./project') // 项目
const global_router = require('./global'); // 全部
const baseUrl = '/api';
const RoleMongodb = require('../../mongodb/role')
const { auth } = require('../../utils')

const router = new Router({
  prefix: baseUrl
});

// 数据拦截判断用户类型
router.all('*', async (ctx, next) => {
  if (!auth.isWhiteList(ctx)) {
    const payload = auth.verify(ctx)
    const { roleName } = payload.data
    const roleData = await RoleMongodb.findRole(roleName)
    const { permissions } = roleData
    auth.authentication(ctx, permissions)
  }
  await next()
});

router.use(user_router.routes(), user_router.allowedMethods());
router.use(role_router.routes(), role_router.allowedMethods());
router.use(img_router.routes(), img_router.allowedMethods());
router.use(task_router.routes(), task_router.allowedMethods());
router.use(note_router.routes(), note_router.allowedMethods());
router.use(project_router.routes(), project_router.allowedMethods())
router.use(global_router.routes(), global_router.allowedMethods());

module.exports = router;
