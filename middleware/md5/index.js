const crypto = require('crypto');

function MD5(ctx) {
    
    ctx.MD5 = (str) => {
        let data_str = str + process.env.MD5_KEY;
        const hash = crypto.createHash('md5');
        hash.update(data_str);
        return hash.digest('hex');
    }
    
}

module.exports = function (options) {
    return async function (ctx, next) {
        MD5(ctx);
        await next(ctx);
    }
}