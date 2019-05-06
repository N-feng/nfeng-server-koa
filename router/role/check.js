class Check {

    static add(ctx) {
        ctx.isStrings(['roleName', 'roleType', 'roleMenu', 'permissions']);
    }

    static getOption(ctx) {}

    static getList(ctx) {}

}

module.exports = Check;