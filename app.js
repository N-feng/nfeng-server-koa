const Koa = require('koa');
const Bouncer = require('koa-bouncer');
const bodyParser = require('koa-bodyparser');
const Config = require('./config/index');
const http = require('http');
const Logger = require('koa-logger');
const NFKoaExtension = require('./lib/extension/NFKoaExtension');
const NFError = require('./lib/extension/NFError');
const KoaCors = require('koa2-cors')

// mongodb
require('./mongodb/NFMongo');

// 创建App
const app = new Koa();

// 错误处理
app.use(NFError);

// 输出调试打印
if (Config.debug) {
    app.use(Logger())
}

// 跨域
if (process.env.CORS === 'true') {
    app.use(KoaCors())
}

app.use(bodyParser());

// 设置参数检查插件
app.use(Bouncer.middleware());

// 设置自定义中间件
app.use(NFKoaExtension);

// router definition
const router = require('./router/index');
app.use(router.routes(), router.allowedMethods());

if (Config.debug) {
    http.createServer(app.callback()).listen(process.env.PORT);
} else {
    http.createServer(app.callback()).listen(80);
}
