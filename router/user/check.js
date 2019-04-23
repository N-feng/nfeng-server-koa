class Check {

    static signup (ctx) {
        ctx.isStrings(['username','password']);
    }

    static login (ctx) {
        ctx.isStrings(['username','password']);
    }

    static getUserList (ctx) {}

    static logOut (ctx) {}

    static getUserInfo (ctx) {}

    static delUser (ctx) {
        ctx.nf_validate.isStrings(['user','pass']);
    }

    static getUser (ctx) {}

}

module.exports = Check;
