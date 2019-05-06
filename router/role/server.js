const ErrorCode = require('../../config/errorCode');
const role = require('../../config/role');
const RoleMongodb = require('../../mongodb/role');

class Server {

    static async add(ctx) {
        const { roleName, roleType, roleMenu, permissions } = ctx.vals;
        const roleData = await RoleMongodb.findRole(roleName);
        if(roleData) {
            throw ErrorCode.role.role_exist;
        }
        const data = await RoleMongodb.addRole(roleName, roleType, roleMenu, permissions);
        return data;
    }

    static async getList() {
        let roleList = await RoleMongodb.findList();
        // const data = userList.map(item => {
        //     return {
        //         username: item.username,
        //     }
        // });
        return roleList;
    }

    static async getOption() {
        return role;
    }

}

module.exports = Server;