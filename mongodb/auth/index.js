const Model = require('./model');

class AuthMongdb {
    constructor() {}

    // 添加用户
    static async addUser (username, password, roleName) {
        const param = {
            username, password, roleName
        };
        return new Model(param).save();
    }

    // 删除用户
    static async delete (username) {
        const param = {
            username
        };
        return await Model.findOneAndRemove(param);
    }

    // 添加登录错误次数
    static async addLoginErr (userModel) {
        await Model.updateOne(
            { _id: this.objId(userModel._id) },
            { loginErrNum: userModel.loginErrNum + 1 }
        )
    }

    // 清除登录数据
    static async clearLoginErr (userModel) {
        if (userModel.loginErrNum) {
            await Model.updateOne(
                { _id: this.objId(userModel._id) },
                { loginErrNum: 0 }
            )
        }
    }

    // 查找用户
    static async findUser (username) {
        const param = {
            username
        };
        return await Model.findOne(param);
    }

    // 查找用户列表
    static async findList () {
        return await Model.find();
    }
}

module.exports = AuthMongdb;