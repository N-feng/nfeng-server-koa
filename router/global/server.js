// const cdn = require('../../lib/cdn/index')

class Server {
    constructor() {}

    static async getAuthorization (ctx) {
        const { Key, Method } = ctx.vals
        const options = {
            Key: Key,
            Method: Method,
        }
        const baseData = cdn.getAuthorization(options)
        return baseData
    }

    static async getCdnUpload (ctx) {
        const { Key, Method } = ctx.vals
        const options = {
            Key: Key,
            Method: Method,
        }
        const baseData = cdn.getCdnUpload(options)
        return baseData
    }

    static async getSignature (ctx) {
        const baseData = cdn.getSignature(ctx.vals)
        return baseData
    }

    static async deleteObject (ctx) {
        const baseData = await cdn.deleteObject(ctx.vals)
        return baseData
    }
}

module.exports = Server