const BaseServer = require('../../base/baseServer');
const AdminMongodb = require('../../../mongodb/admin/index');

class Server extends BaseServer {

    static async getUserList () {
        // 查找账户
        let userData = await AdminMongodb.findUserList();
        const resData = userData.map(item => {
            return {
                user: item.user,
                pass: item.pass,
                icon: item.icon
            }
        });
        return resData;
    }

}

module.exports = Server;