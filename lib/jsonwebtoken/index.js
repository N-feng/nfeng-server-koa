const jwt = require('jsonwebtoken');
const NFError = require('../../config/errorCode');

const WJWT_KEY = process.env.WJWT_KEY;

class WJWT {

    // 获取token
    static getToken(data = {}) {
        return jwt.sign({
            data: data
        }, WJWT_KEY, {
            expiresIn: 60 * 60 * 2
        })
    }

    // 获取数据
    static getData (token = '') {
        return new Promise((resolve, reject) => {
            jwt.verify(token, WJWT_KEY, function (err, decoded) {
                if (err) {
                    reject(NFError.token.outOfDate);
                } else {
                    resolve(decoded.data);
                }
            })
        });
    }

}

module.exports = WJWT;