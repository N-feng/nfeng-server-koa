const BaseCheck = require('../base/baseCheck');

class Check extends BaseCheck {

    constructor() {
        super()
    }

    static register (ctx) {
        ctx.nf_validate.isStrings(['username','password']);
        const { username, password } = ctx.vals;
        if (!username) {
            throw {
                code: 200,
                msg: 'Please enter your username'
            }
        }
        if (!password) {
            throw {
                code: 200,
                msg: 'Please enter your password'
            }
        }
    }

    static login (ctx) {
        ctx.nf_validate.isStrings(['username','password']);
    }

    static logOut (ctx) {}

    static getUserInfo (ctx) {}

    static intercept (ctx) {}

    static delUser (ctx) {
        ctx.nf_validate.isStrings(['user','pass']);
    }

}

module.exports = Check;
