const NFTool = require('../../lib/extension/NFTool');
const AdminMongodb = require('../../mongodb/admin/index');
const ErrorCode = require('../../config/errorCode');
const { getToken } = require('../../lib/jsonwebtoken');
const BaseServer = require('../base/baseServer');

class Server extends BaseServer {

    static async login (ctx) {
        // 获取账号密码
        const {user, pass} = ctx.vals;
        const passMD5 = NFTool.MD5(pass);
        // 查找账户
        let userData = await AdminMongodb.findUser(user);
        // 如果没有找到用户直接返回错误
        if (!userData) {
            throw ErrorCode.admin.user_nonentity;
        }
        // 判断用户登录错误次数
        if (userData.loginErrNum > 111) {
            throw ErrorCode.admin.login_max;
        }
        // 判断账号密码是否正确
        if (passMD5 != userData.pass) {
            // 记录登录错误加1
            AdminMongodb.addLoginErr(userData);
            throw ErrorCode.admin.login_err;
        }
        // 清除登录错误
        AdminMongodb.clearLoginErr(userData);
        // ==== 用户通过验证 ====
        // 设置令牌
        const token = getToken(userData);
        const resData = {
            user: userData.user,
            icon: userData.icon
        };
        return {
            token,
            ...resData
        }
    }

    // 拦截(判断用户是否登录)
    static async intercept (ctx) {
        const userDate = await this.getUserData(ctx);
        ctx.userData = userDate;
    }

    static async logOut (ctx) {}

    static async getUserInfo (ctx) {
        let userData = ctx.userData;
        const resData = {
            user: userData.user,
            icon: userData.icon
        }
        return resData;
    }

    static async register (ctx) {
        // 获取账号密码
        const {user, pass} = ctx.vals;
        const passMD5 = NFTool.MD5(pass);
        // 查找账户
        let userData = await AdminMongodb.findUser(user);
        // 如果用户已经存在直接抛出错误
        if (userData) {
            throw ErrorCode.admin.user_exist;
        }
        const data = await AdminMongodb.addUser(user, passMD5);
        return data;
    }

    static async delUser (ctx) {
        // 获取账号密码
        const {user, pass} = ctx.vals;
        // 查找账户
        let userData = await AdminMongodb.findUserRemove(user, pass);
        // 如果没有找到用户直接返回错误
        if (!userData) {
            throw ErrorCode.admin.user_nonentity;
        }
        const resData = {
            user: userData.user,
            icon: userData.icon
        }
        return resData;
    }

}

module.exports = Server;