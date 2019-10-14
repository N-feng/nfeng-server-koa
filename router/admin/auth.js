const Router = require('koa-router')
const UserMongodb = require('../../mongodb/auth')
const RoleMongodb = require('../../mongodb/role')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

function getToken(data) {
  return jwt.sign({ data }, process.env.JWT_KEY, { expiresIn: '48h' })
}

function MD5(str) {
  let data_str = str + process.env.MD5_KEY;
  const hash = crypto.createHash('md5');
  hash.update(data_str);
  return hash.digest('hex');
}

const router = new Router({
  prefix: '/auth'
})

// 添加用户
router.post('/signup', async (ctx) => {
  ctx.isStrings(['username', 'password', 'roleName'])
  const { username, password, roleName } = ctx.vals
  const MD5password = MD5(password)
  if (await UserMongodb.findUser(username)) {
    throw { code: 10001, msg: '用户已经存在' }
  }
  const userData = await UserMongodb.addUser(username, MD5password, roleName)
  const roleData = await RoleMongodb.findRole(userData.roleName)
  const infoData = {
    username: userData.username,
    password: userData.password,
    avatar: userData.avatar,
    roleName: userData.roleName,
    permissions: roleData.permissions,
  }
  const token = getToken(infoData)
  const data = {
    ...infoData,
    token,
  }
  ctx.sendSuccess(data, 'create success!')
})

// 登录接口
router.post('/login', async (ctx) => {
  ctx.isStrings(['username', 'password'])
  const { username, password } = ctx.vals
  const MD5password = MD5(password)
  const userData = await UserMongodb.findUser(username)
  if (!userData) {
    throw { code: 10002, msg: '用户不存在' }
  }
  if (userData.loginErrNum > 111) {
    throw { code: 10006, msg: '登录错误次数超出上限' }
  }
  if (MD5password != userData.password) {
    UserMongodb.addLoginErr(userData)
    throw { code: 10003, msg: '账号或者密码错误' }
  }
  UserMongodb.clearLoginErr(userData)
  const roleData = await RoleMongodb.findRole(userData.roleName)
  const infoData = {
    username: userData.username,
    password: userData.password,
    avatar: userData.avatar,
    roleName: userData.roleName,
    permissions: roleData.permissions,
  }
  const token = getToken(infoData)
  const data = {
    ...infoData,
    token,
  }
  ctx.sendSuccess(data, '登录成功!')
})

// 删除用户
router.post('/delete', async (ctx) => {
  ctx.isStrings(['username', 'password'])
  const { username } = ctx.vals
  const userData = await UserMongodb.delete(username)
  if (!userData) {
    throw { code: 10002, msg: '用户不存在' }
  }
  const data = {
    username: userData.username
  }
  ctx.sendSuccess(data, 'delete success!')
})

router.post('/update', async (ctx) => {
  ctx.isStrings(['username', 'roleName'])
  const { username, roleName } = ctx.vals
  if (!await UserMongodb.findUser(username)) {
    throw { code: 10002, msg: '用户不存在' }
  }
  const userData = await UserMongodb.updateUser(username, roleName)
  if (!userData.ok) {
    throw { code: 500, msg: 'update fail~' }
  }
  ctx.sendSuccess('', 'update success~')
})

router.post('/detail', async (ctx) => {
  ctx.isStrings(['username'])
  const { username } = ctx.vals
  const userData = await UserMongodb.findUser(username)
  if (!userData) {
    throw { code: 10002, msg: '用户不存在' }
  }
  const data = {
    username: userData.username,
    roleName: userData.roleName,
  }
  ctx.sendSuccess(data)
})

// 获取用户列表信息
router.post('/list', async (ctx) => {
  const userList = await UserMongodb.findList()
  const data = userList.map(item => {
    return {
      username: item.username,
      roleName: item.roleName,
    }
  })
  ctx.sendSuccess(data)
})

module.exports = router
