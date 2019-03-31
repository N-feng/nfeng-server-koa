const BaseServer = require('../../base/baseServer');
const AdminMongodb = require('../../../mongodb/admin/index');

class Server extends BaseServer {

  static async signup (ctx) {
    // 获取账号密码
    const { username, password } = ctx.vals;
    const passwordMD5 = NFTool.MD5(password);
    // 查找账户
    let userData = await AdminMongodb.findUser(username);
    // 如果用户已经存在直接抛出错误
    if (userData) {
        throw ErrorCode.admin.user_exist;
    }
    const data = await AdminMongodb.addUser(username, passwordMD5);
    return data;
  }

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
