class Check {

    static signup (ctx) {
        ctx.isStrings(['username','password']);
    }

    static login (ctx) {
        ctx.isStrings(['username','password']);
    }

    static delete (ctx) {
        ctx.isStrings(['username','password']);
    }

    static getUser (ctx) {}

    static getList (ctx) {}

    static logout (ctx) {}

}

module.exports = Check;
