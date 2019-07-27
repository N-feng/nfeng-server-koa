const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    'roleName': { type: String, default: '' },
    'roleType': { type: String, default: '' },
    'roleMenu': { type: Array, default: [] },
    'permissions': { type: Array, default: [] },
});

const RoleModel = mongoose.model('RoleModel', RoleSchema, 'role');

class RoleMongodb {
    constructor() { }

    static async findRole(roleName) {
        const param = {
            roleName
        };
        return await RoleModel.findOne(param);
    }

    static async addRole(roleName, roleType, roleMenu, permissions) {
        const param = {
            roleName, roleType, roleMenu, permissions
        };
        return new RoleModel(param).save();
    }

    static async delete(roleName) {
        const param = {
            roleName
        };
        return await RoleModel.findOneAndRemove(param);
    }

    static async updateRole(roleName, roleType, roleMenu, permissions) {
        const param = {
            roleName
        }
        return await RoleModel.updateOne(param, { roleType, roleMenu, permissions });
    }

    static async findList() {
        return await RoleModel.find();
    }
}

module.exports = RoleMongodb;