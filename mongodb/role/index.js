const Model = require('./model');

class RoleMongodb {
    constructor() {}

    static async addRole(roleName, roleType, roleMenu, permissions) {
        const param = {
            roleName, roleType, roleMenu, permissions
        };
        return new Model(param).save();
    }

    static async delete (roleName) {
        const param = {
            roleName
        };
        return await Model.findOneAndRemove(param);
    }

    static async findRole(roleName) {
        const param = {
            roleName
        };
        return await Model.findOne(param);
    }

    static async findList () {
        return await Model.find();
    }
}

module.exports = RoleMongodb;
