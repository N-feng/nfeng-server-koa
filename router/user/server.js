const ErrorCode = require('../../config/errorCode');
const Token = require('../../lib/token');
const MD5 = require('../../lib/md5');
const UserMongodb = require('../../mongodb/user');

class Server {

    static async signup (ctx) {
        // 获取账号密码
        const { username, password } = ctx.vals;
        const passwordMD5 = MD5(password);
        // 查找账户
        let userData = await UserMongodb.findUser(username);
        // 如果用户已经存在直接抛出错误
        if (userData) {
            throw ErrorCode.admin.user_exist;
        }
        const data = await UserMongodb.addUser(username, passwordMD5);
        return data;
    }

    static async login (ctx) {
        // 获取账号密码
        const { username, password } = ctx.vals;
        const passwordMD5 = MD5(password);
        // 查找账户
        let userData = await UserMongodb.findUser(username);
        // 如果没有找到用户直接返回错误
        if (!userData) {
            throw ErrorCode.admin.user_nonentity;
        }
        // 判断用户登录错误次数
        if (userData.loginErrNum > 111) {
            throw ErrorCode.admin.login_max;
        }
        // 判断账号密码是否正确
        if (passwordMD5 != userData.password) {
            // 记录登录错误加1
            UserMongodb.addLoginErr(userData);
            throw ErrorCode.admin.login_err;
        }
        // 清除登录错误
        UserMongodb.clearLoginErr(userData);
        // ==== 用户通过验证 ====
        // 设置令牌
        const token = Token.getToken(userData);
        const resData = {
            username: userData.username,
            avatar: userData.avatar
        };
        return {
            token,
            ...resData
        }
    }

    static async getUserList () {
        // 查找账户
        let userData = await UserMongodb.findUserList();
        console.log(userData)
        const resData = userData.map(item => {
            return {
                user: item.user,
                pass: item.pass,
                icon: item.icon
            }
        });
        return resData;
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

    static async delUser (ctx) {
        // 获取账号密码
        const {user, pass} = ctx.vals;
        // 查找账户
        let userData = await UserMongodb.findUserRemove(user, pass);
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

    static async getUser (ctx) {
        const token = ctx.request.header.token;
        return await Token.getUser(token);
    }

}

module.exports = Server;
