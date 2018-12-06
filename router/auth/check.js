const BaseCheck = require('../base/baseCheck');

class Check extends BaseCheck {

    constructor() {
        super()
    }

    static login (ctx) {
        ctx.nf_validate.isStrings(['user','pass']);
    }

    static logOut (ctx) {}

    static getUserInfo (ctx) {}

    static intercept (ctx) {}

    static register (ctx) {
        ctx.nf_validate.isStrings(['user','pass']);
        // 获取账号密码
        const {user, pass} = ctx.vals;
        // 验证账户是否为空
        if (!user) {
            throw {
                code: 200,
                msg: '账户不能为空'
            }
        }
    }

    static delUser (ctx) {
        ctx.nf_validate.isStrings(['user','pass']);
    }

}

module.exports = Check;