const menu = require('../../config/menu')

class Server {
    static async getMenu () {
        return menu
    }
}

module.exports = Server