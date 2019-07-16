const Router = require('koa-router');
const RoleMongodb = require('../mongodb/role');

const router = new Router({
    prefix: '/role',
});

// 判断用户访问权限
// router.all('*', async (ctx, next) => {
//     const userData = await ctx.getUser(ctx);
//     const { permissions } = userData;
//     ctx.checkApi(ctx, permissions);
//     await next();
// });

router.post('/add', async (ctx) => {
    ctx.isStrings(['roleName', 'roleType', 'roleMenu', 'permissions']);
    const { roleName, roleType, roleMenu, permissions } = ctx.vals;
    const roleData = await RoleMongodb.findRole(roleName);
    if (roleData) {
        throw { code: 500, msg: '角色已经存在' };
    }
    const data = await RoleMongodb.addRole(roleName, roleType, roleMenu, permissions);
    ctx.sendSuccess(data, '创建成功~');
});

router.post('/update', async (ctx) => {
    ctx.isStrings(['roleName', 'roleType', 'roleMenu', 'permissions']);
    const { roleName, roleType, roleMenu, permissions } = ctx.vals;
    const roleData = await RoleMongodb.findRole(roleName);
    if (!roleData) {
        throw { code: 500, msg: '角色不存在' };
    }
    await RoleMongodb.updateRole(roleName, roleType, roleMenu, permissions);
    ctx.sendSuccess(roleData, '修改成功~');
});

router.post('/delete', async (ctx) => {
    ctx.isStrings(['roleName']);
    const { roleName } = ctx.vals;
    const roleData = await RoleMongodb.delete(roleName);
    if (!roleData) {
        throw { code: 500, msg: '角色不存在' };
    }
    const data = { roleName };
    ctx.sendSuccess(data, '删除成功~');
});

router.post('/detail', async (ctx) => {
    ctx.isStrings(['roleName']);
    const { roleName } = ctx.vals;
    const data = await RoleMongodb.findRole(roleName);
    ctx.sendSuccess(data);
});

router.post('/list', async (ctx) => {
    // const listData = await RoleMongodb.findList();
    // const data = listData.map(obj => {
    //     let rObj = {};
    //     const roleMenuList = ctx.getRoleMenuList(obj.roleMenu);
    //     rObj = Object.assign({}, {
    //         roleName: obj.roleName,
    //         roleType: obj.roleType,
    //         roleMenu: obj.roleMenu,
    //         permissions: obj.permissions,
    //     }, { roleMenuList });
    //     return rObj;
    // });
    const data = await RoleMongodb.findList();
    ctx.sendSuccess(data);
});

module.exports = router;