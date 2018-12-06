const Config = require('../../config/index');
const NFParameterCheck = require('./NFParameterCheck');

const logger = (ctx, next) => {

    // 发送正确数据
    ctx.sendSuccess = (data = {}, msg = '') => {
        ctx.response.type = 'json';
        const body = {
            data: data,
            code: 200,
            msg: msg
        };
        if (Config.debug) {
            console.log(body)
        }
        // WLogs.trace(`--> ${JSON.stringify(body)}`)
        ctx.response.body = body;
    };

    NFParameterCheck(ctx);

    return next();
};

module.exports = logger;