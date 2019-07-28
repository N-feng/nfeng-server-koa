const Router = require('koa-router')
const RoleMongodb = require('../../mongodb/role')

const router = new Router({
  prefix: '/global'
})

router.post('/menus', async (ctx) => {
  ctx.isStrings(['roleName'])
  const { roleName } = ctx.vals
  const roleData = await RoleMongodb.findRole(roleName)
  if (!roleData) {
    throw { code: 500, msg: '角色不存在' };
  }
  const data = roleData.roleMenu
  ctx.sendSuccess(data)
})

router.post('/roleNameList', async (ctx) => {
  const roleList = await RoleMongodb.findList()
  const data = roleList.map(item => item.roleName)
  ctx.sendSuccess(data)
})

module.exports = router
