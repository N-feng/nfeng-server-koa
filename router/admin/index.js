const Router = require("koa-router");
const role_router = require("./role"); // 角色
const user_router = require("./auth"); // 用户
const img_router = require("./img"); // 图片
const task_router = require("./task"); // 任务
const note_router = require("./note"); // 笔记
const global_router = require("./global"); // 全部
const jwt = require("jsonwebtoken");
const baseUrl = "/api";

function getUser(TokenData) {
  return new Promise((resolve, reject) => {
    jwt.verify(TokenData, process.env.JWT_KEY, function (err, decoded) {
      if (err) {
        console.log(err);
        reject({ code: 401, msg: "token 过时" });
      } else {
        resolve(decoded.data);
      }
    });
  });
}

const router = new Router({
  prefix: baseUrl
});

// 数据拦截判断用户类型
router.all("*", async (ctx, next) => {
  const indexOf = ctx.request.url.indexOf("?");
  const url =
    indexOf === -1 // 区分get/post请求
      ? ctx.request.url.replace(baseUrl, "") // post请求拿到的地址
      : ctx.request.url.substring(baseUrl.length, indexOf); // get请求拿到的地址
  const whiteList = ["/auth/login", "/auth/signup", "/note/list", "/note/detail"]; // 白名单
  if (whiteList.some(item => item === url)) {
    await next();
    return;
  }
  const TokenKey = "Nfeng-Token";
  const TokenData = ctx.cookies.get(TokenKey);
  const infoData = await getUser(TokenData);
  if (!infoData) {
    throw { code: 500, msg: "角色不存在" };
  } else {
    if (infoData.permissions.some(item => item === url)) {
      await next();
    } else {
      throw { code: "500", msg: "您没有权限访问此接口哦~" };
    }
  }
});

router.use(user_router.routes(), user_router.allowedMethods());
router.use(role_router.routes(), role_router.allowedMethods());
router.use(img_router.routes(), img_router.allowedMethods());
router.use(task_router.routes(), task_router.allowedMethods());
router.use(note_router.routes(), note_router.allowedMethods());
router.use(global_router.routes(), global_router.allowedMethods());

module.exports = router;
