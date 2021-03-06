const Koa = require('koa')
const bouncer = require('koa-bouncer')
const cors = require('koa2-cors')
// const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const Logger = require('koa-logger')
const Config = require('./config/index')
const NFError = require('./middleware/error')
const Utils = require('./middleware/utils')
const Validator = require('./middleware/validator')
const fs = require('fs')
const http = require('http')
const https = require('https')
const Static = require("koa-static")
const Path = require('path')

require('./mongodb')

const app = new Koa()
app.use(bouncer.middleware())
app.use(cors())
// app.use(bodyParser())
app.use(koaBody({
    multipart: true, // 支持文件上传
    // encoding:'gzip',
    formidable: {
        uploadDir: Path.join(__dirname, '/static/upload/'), // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        //   maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
        onFileBegin: (name, file) => { // 文件上传前的设置
            // console.log(`name: ${name}`);
            // console.log(file);
        },
    }
}))
app.use(Logger())
app.use(NFError)
app.use(Utils())
app.use(Validator())
app.use(Static(Path.join(__dirname, 'static')))

// router definition
const router = require('./router/index')
app.use(router.routes(), router.allowedMethods())

// https 密钥
const options = {
    key: fs.readFileSync(Config.ssl.keyPath),
    cert: fs.readFileSync(Config.ssl.certPath),
}

if (Config.debug) {
    http.createServer(app.callback()).listen(process.env.PORT)
} else {
    http.createServer(app.callback()).listen(80)
    https.createServer(options, app.callback()).listen(443)
}
