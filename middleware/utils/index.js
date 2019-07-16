// const roleModel = require('../../config/roleModel');

function Utils(ctx) {

    /**
     * 发送html文件
     * @param src 文件路径 (view文件夹里面的路径)
     */
    ctx.sendHtmlFile = (src) => {
        ctx.response.type = 'html'
        ctx.response.body = fs.createReadStream(src)
    }

    // 发送正确数据
    ctx.sendSuccess = (data = {}, msg = '') => {
        ctx.response.type = 'json';
        const body = {
            data: data,
            code: 200,
            msg: msg
        };
        // if (Config.debug) {
        //     console.log(body)
        // }
        // WLogs.trace(`--> ${JSON.stringify(body)}`)
        ctx.response.body = body;
    };

    // 转换菜单
    // ctx.getRoleMenuList = (roleMenu) => {
    //     const { menuList } = roleModel;
    //     const roleMenuList = roleMenu.map(obj => {
    //         let rObj = {};
    //         menuList.forEach(item => {
    //             if (obj === item.path) {
    //                 rObj = item;
    //             }
    //         });
    //         return rObj;
    //     });
    //     return roleMenuList;
    // }

    // 校验接口
    ctx.checkApi = (ctx, permissions) => {
        const url = ctx.request.url;
        const found = permissions.find(function (element) {
            return element === url;
        });
        if (!found) {
            throw { code: 403, msg: '你没有权限访问这个接口~' };
        }
    }

}

module.exports = function (options) {
    return async function (ctx, next) {
        Utils(ctx);
        await next();
    }
};