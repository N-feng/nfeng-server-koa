const Router = require('koa-router');
const Server = require('./server');
const Check = require('./check');
const RoleMongodb = require('../../mongodb/role');

const router = new Router({
    prefix: '/role',
});

router.post('/add', async (ctx) => {
    Check.add(ctx);
    const data = await Server.add(ctx);
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

router.post('/option', async (ctx) => {
    Check.getOption(ctx);
    const data = await Server.getOption(ctx);
    ctx.sendSuccess(data);
});

router.post('/list', async (ctx) => {
    Check.getList(ctx);
    const data = await Server.getList(ctx);
    ctx.sendSuccess(data);
});

module.exports = router;