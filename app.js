const Koa = require('koa');
const Bouncer = require('koa-bouncer');
const KoaCors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');
const Logger = require('koa-logger');
const Config = require('./config/index');
const NFError = require('./middleware/error');
const Utils = require('./middleware/utils');
const MD5 = require('./middleware/md5');
const Validator = require('./middleware/validator');
const Jwt = require('./middleware/jwt');
const fs = require('fs');
const http = require('http');
const https = require('https');

require('./mongodb');

const app = new Koa();
app.use(Bouncer.middleware());
app.use(KoaCors());
app.use(bodyParser());
app.use(Logger());
app.use(NFError);
app.use(Utils());
app.use(MD5());
app.use(Validator());
app.use(Jwt());

// router definition
const router = require('./router/index');
app.use(router.routes(), router.allowedMethods());

// https 密钥
const options = {
  key: fs.readFileSync(Config.ssl.keyPath),
  cert: fs.readFileSync(Config.ssl.certPath),
}

if (Config.debug) {
    http.createServer(app.callback()).listen(process.env.PORT);
} else {
    http.createServer(app.callback()).listen(80);
    https.createServer(options, app.callback()).listen(443);
}
