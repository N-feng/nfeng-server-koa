module.exports = [
    {
        path: '/system/landing',
        name: 'landing',
        title: '登陆页',
        id: 100000,
        parentId: 0,
    },
    {
        path: '/system/role',
        name: 'roleList',
        title: '角色管理',
        id: 100001,
        parentId: 0,
    },
    {
        path: '/system/role/list',
        name: 'roleList',
        title: '角色列表',
        id: 110000,
        parentId: 100001,
    },
    {
        path: '/system/role/create',
        name: 'roleCreate',
        title: '角色创建',
        id: 110001,
        parentId: 100001,
    },
    {
        path: '/system/userlist',
        name: 'userlist',
        title: '用户列表',
        id: 100002,
        parentId: 0,
    },
    {
        path: 'landinga',
        name: 'landing',
        title: '图片管理',
        id: 100003,
        parentId: 0,
    },
]