const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    'username': { type: String, default: '' },
    'password': { type: String, default: '' },
    'loginErrNum': { type: Number, default: 0 },  // 登录错误次数
    'createTime': { type: Date, default: new Date() },
    'avatar': { type: String, default: '' },
    'roleName': { type: String, default: '' },
});

const AuthModel = mongoose.model('AuthModel', UserSchema, 'user');

class AuthMongdb {
    constructor() { }

    // 查找用户
    static async findUser(username) {
        const param = {
            username
        };
        return await AuthModel.findOne(param);
    }

    // 查找用户列表
    static async findList() {
        return await AuthModel.find();
    }

    // 添加用户
    static async addUser(username, password, roleName) {
        const param = {
            username, password, roleName
        };
        return new AuthModel(param).save();
    }

    static async updateUser(username, roleName) {
        const param = { username }
        return AuthModel.updateOne(param, { roleName });
    }

    // 删除用户
    static async delete(username) {
        const param = {
            username
        };
        return await AuthModel.findOneAndRemove(param);
    }

    // 添加登录错误次数
    static async addLoginErr(user) {
        await AuthModel.updateOne(
            { _id: this.objId(user._id) },
            { loginErrNum: user.loginErrNum + 1 }
        )
    }

    // 清除登录数据
    static async clearLoginErr(user) {
        if (user.loginErrNum) {
            await AuthModel.updateOne(
                { _id: this.objId(user._id) },
                { loginErrNum: 0 }
            )
        }
    }
}

module.exports = AuthMongdb;