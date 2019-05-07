const Router = require('koa-router');
const RoleMongodb = require('../mongodb/role');
const role = require('../config/role');

const router = new Router({
    prefix: '/role',
});

router.post('/add', async (ctx) => {
    ctx.isStrings(['roleName', 'roleType', 'roleMenu', 'permissions']);
    const { roleName, roleType, roleMenu, permissions } = ctx.vals;
    const roleData = await RoleMongodb.findRole(roleName);
    if(roleData) {
        throw ErrorCode.role.role_exist;
    }
    const data = await RoleMongodb.addRole(roleName, roleType, roleMenu, permissions);
    ctx.sendSuccess(data);
});

router.post('/save', async (ctx) => {
    ctx.isStrings(['roleName', 'roleType', 'roleMenu', 'permissions', 'roleMenuList']);
    const { roleName, roleType, roleMenu, permissions, roleMenuList } = ctx.vals;
    const roleData = await RoleMongodb.findRole(roleName);
    let data = '';
    if(roleData) {
        data = await RoleMongodb.updateRole(roleName, roleType, roleMenu, permissions, roleMenuList);
    } else {
        data = await RoleMongodb.addRole(roleName, roleType, roleMenu, permissions, roleMenuList);
    }
    ctx.sendSuccess(data);
});

router.post('/delete', async (ctx) => {
    ctx.isStrings(['roleName']);
    const { roleName } = ctx.vals;
    const role = await RoleMongodb.delete(roleName);
    if (!role) {
        throw ErrorCode.role.role_nonentity;
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
    const data = await RoleMongodb.findList();
    ctx.sendSuccess(data);
});

router.post('/option', async (ctx) => {
    const data = role;
    ctx.sendSuccess(data);
});

module.exports = router;