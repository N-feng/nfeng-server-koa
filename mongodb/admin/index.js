const Model = require('./model');
const BaseMongodb = require('../baseMongodb');

class AdminMongodb extends BaseMongodb {

    constructor () {
        super()
    }

    // 添加用户
    static async addUser (user, pass) {
        const p = {
            user,
            pass
        };
        return new Model(p).save();
    }

    // 查找admin账户
    static async findUser (user, admin) {
        const p = {
            user
        };
        return await Model.findOne(p);
    }

    // 查找admin账户 并删除
    static async findUserRemove (user, pass) {
        const p = {
            user,
            pass
        };
        return await Model.findOneAndRemove(p);
    }

    // 查找admin账户列表
    static async findUserList () {
        return await Model.find();
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

}

module.exports = AdminMongodb;