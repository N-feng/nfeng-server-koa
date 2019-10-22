const jwt = require('jsonwebtoken');

const auth = {
  verify: (ctx, cookies) => {
    const TokenKey = 'Nfeng-Token';
    const TokenData = ctx.cookies.get(TokenKey) || cookies;
    if (!TokenData) {
      throw { code: 500, msg: 'token not found' }
    }
    try {
      return jwt.verify(TokenData, process.env.JWT_KEY)
    } catch (err) {
      // console.log(err.name)
      throw { code: 500, msg: err.name }
    }
  },
  isWhiteList: (ctx) => {
    const whiteList = [
      '/auth/login',
      '/auth/signup',
      '/note/list',
      '/note/detail',
      '/project/list',
      '/img/add'
    ]; // 白名单
    return whiteList.some(item => ctx.url.indexOf(item) !== -1)
  },
  authentication: (ctx, permissions) => {
    if (!permissions.some(item => ctx.url.indexOf(item) !== -1)) {
      throw { code: 500, msg: 'You do not have access this interface' }
    }
  }
}

module.exports = auth