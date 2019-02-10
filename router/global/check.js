const BaseCheck = require('../base/baseCheck')

class Check extends BaseCheck {
    constructor() {
        super()
    }
    /**
     * 获取凭证
     * @param ctx 环境上下文
     */
    static getAuthorization(ctx) {
        ctx.nf_validate.isStrings(['Key', 'Method']);
    }
    /**
     * 获取cdn上传地址
     * @param ctx 环境上下文
     */
    static getCdnUpload(ctx) {
        ctx.nf_validate.isStrings(['Key', 'Method']);
    }
    /**
     * 获取签名
     * @param ctx 环境上下文
     */
    static getSignature(ctx) {
        ctx.nf_validate.isStrings(['Key', 'Method']);
    }
}

module.exports = Check
