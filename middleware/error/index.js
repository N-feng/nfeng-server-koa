const bouncer = require('koa-bouncer');
const { debug } = require('../../config/index');

const logger = async (ctx, next) => {
    // 错误处理
    try {
        await next();
    } catch (err) {
        // WLogs.error(err);
        const status = err.code ? 200 : err.statusCode || err.status || 500;
        if (debug && status != 304) {
            console.log('============== 错误 ===============');
            console.log(err);
        }

        // ===================== koa-bouncer错误 ==================
        if (err instanceof bouncer.ValidationError) {
            ctx.status = 200;
            ctx.response.body = {
                code: 14100,
                msg: err.bouncer.message
            }
        }
        // ===================== MongooseError错误 ==================
        else if (err.constructor.name === 'MongooseError') {
            ctx.status = 200;
            ctx.response.body = {
                code: 14200,
                msg: err
            }
        }
        // ===================== 未知错误 ==================
        else {
            ctx.status = status;
            ctx.response.body = {
                code: err.code,
                msg: err.msg
            }
        }
    }
};

module.exports = logger;