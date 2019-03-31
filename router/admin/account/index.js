const Router = require('koa-router');
const Check = require('./check');
const Server = require('./server');

const router = new Router({
    prefix: '/account'
});

// 注册
router.get('/signup', async (ctx) => {
  Check.signup(ctx);
  const data = await Server.singn(ctx);
  ctx.sendSuccess(data, '创建成功!');
  // console.log(ctx.validateQuery());
});

// 数据拦截判断用户类型
router.all('*', async (ctx, next) => {
    const token = ctx.request.header.token;
    const userData = await getData(token);
    // 重新刷新数据
    if (userData.type === 1) {
        throw ErrorCode.admin.admin_err
    }
    await next();
});

// 获取用户列表信息
router.get('/getUserList', async (ctx) => {
    Check.getUserList(ctx);
    const data = await Server.getUserList(ctx);
    ctx.sendSuccess(data);
});

module.exports = router;
