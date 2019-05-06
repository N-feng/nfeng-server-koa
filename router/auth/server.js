const ErrorCode = require('../../config/errorCode');
const Token = require('../../lib/token');
const MD5 = require('../../lib/md5');
const UserMongodb = require('../../mongodb/auth');

class Server {

    static async signup(ctx) {
        // 获取账号密码
        const { username, password } = ctx.vals;
        const MD5password = MD5(password);
        // 查找账户
        const userData = await UserMongodb.findUser(username);
        // 如果用户已经存在直接抛出错误
        if (userData) {
            throw ErrorCode.admin.user_exist;
        }
        const data = await UserMongodb.addUser(username, MD5password);
        return data;
    }

    static async login(ctx) {
        // 获取账号密码
        const { username, password } = ctx.vals;
        const MD5password = MD5(password);
        // 查找账户
        const userData = await UserMongodb.findUser(username);
        // 如果没有找到用户直接返回错误
        if (!userData) {
            throw ErrorCode.admin.user_nonentity;
        }
        // 判断用户登录错误次数
        if (userData.loginErrNum > 111) {
            throw ErrorCode.admin.login_max;
        }
        // 判断账号密码是否正确
        if (MD5password != userData.password) {
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

    static async delete(ctx) {
        // 获取账号密码
        const { username } = ctx.vals;
        // 查找账户
        const user = await UserMongodb.delete(username);
        // 如果没有找到用户直接返回错误
        if (!user) {
            throw ErrorCode.admin.user_nonentity;
        }
        return {
            username: user.username
        }
    }

    static async getUser (ctx) {
        const token = ctx.request.header.token;
        const user = await Token.getUser(token);
        return {
            username: user.username
        }
    }

    static async getList() {
        let userList = await UserMongodb.findList();
        const data = userList.map(item => {
            return {
                username: item.username,
            }
        });
        return data;
    }

}

module.exports = Server;
