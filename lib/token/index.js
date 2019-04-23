const jwt = require('jsonwebtoken');
const NFError = require('../../config/errorCode');

const JWT_KEY = process.env.JWT_KEY;

class TOKEN {

    // 获取token
    static getToken(data = {}) {
        return jwt.sign({
            data: data
        }, JWT_KEY, {
            expiresIn: 60 * 60 * 2
        })
    }

    // 获取数据
    static getUser(token = '') {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_KEY, function (err, decoded) {
                if (err) {
                    reject(NFError.token.outOfDate);
                } else {
                    resolve(decoded.data);
                }
            })
        });
    }

}

module.exports = TOKEN;