const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY;

function TOKEN(ctx) {

    // 获取token
    ctx.getToken = (data = {}) => {
        return jwt.sign({
            data: data
        }, JWT_KEY, {
            expiresIn: 60 * 60 * 2
        })
    }

    // 获取数据
    ctx.getUser = (ctx) => {
        const token = ctx.request.header.token;
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_KEY, function (err, decoded) {
                if (err) {
                    reject({ code: 401, msg: 'token 过时' });
                } else {
                    resolve(decoded.data);
                }
            })
        });
    }

}

module.exports = function (options) {
    return async function (ctx, next) {
        TOKEN(ctx);
        await next();
    }
}