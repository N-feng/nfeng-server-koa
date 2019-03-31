const BaseCheck = require('../../base/baseCheck');

class Check extends BaseCheck {

    constructor () {
        super()
    }

    static signup (ctx) {
      const rules = {
        username: [
          { validator: 'isNonEmpty', message: 'Please enter your username' },
        ],
        password: [
          { validator: 'isNonEmpty', message: 'Please enter your password' },
        ],
      }
      ctx.check(rules)
      // console.log(ctx.validateQuery('username'))
      // return ctx.validateQuery('username').required('diudiudiu')
      // ctx.checkBody('username')
    }

    static getUserList (ctx) {}

}

module.exports = Check;
