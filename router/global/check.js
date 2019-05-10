class Check {
    /**
     * 获取凭证
     */
    static getAuthorization(ctx) {
        ctx.nf_validate.isStrings(['Key', 'Method']);
    }
    /**
     * 获取cdn上传地址
     */
    static getCdnUpload(ctx) {
        ctx.nf_validate.isStrings(['Key', 'Method']);
    }
    /**
     * 获取签名
     */
    static getSignature(ctx) {
        ctx.nf_validate.isStrings(['Key', 'Method']);
    }
    /**
     * 删除文件
     */
    static deleteObject(ctx) {
        ctx.nf_validate.isStrings(['Key'])
    }
}

module.exports = Check
