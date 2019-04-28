const role = require('../../config/role');

class Server {

    static async getList() {
        return role;
    }

}

module.exports = Server;