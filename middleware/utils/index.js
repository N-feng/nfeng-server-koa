// const roleModel = require('../../config/roleModel');
const fs = require('fs')

function Utils(ctx) {

    /**
     * 发送html文件
     * @param src 文件路径 (view文件夹里面的路径)
     */
    ctx.sendHtmlFile = (src) => {
        ctx.response.type = 'html'
        ctx.response.body = fs.createReadStream(src)
    }

    // 发送正确数据
    ctx.sendSuccess = (data = {}, msg = '') => {
        ctx.response.type = 'json';
        const body = {
            data: data,
            code: 200,
            msg: msg
        };
        // if (Config.debug) {
        //     console.log(body)
        // }
        // WLogs.trace(`--> ${JSON.stringify(body)}`)
        ctx.response.body = body;
    };

}

module.exports = function (options) {
    return async function (ctx, next) {
        Utils(ctx);
        await next();
    }
};