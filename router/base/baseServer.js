const { getData } = require('../../lib/jsonwebtoken');

class BaseServer {

    constructor () {}

    // 获取用户数据
    static async getUserData(ctx) {
        const token = ctx.request.header.token;
        return await getData(token);
    }

}

module.exports = BaseServer;