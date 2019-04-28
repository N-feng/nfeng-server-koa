module.exports = [
    {
        path: '/auth/landing',
        name: 'landing',
        title: '登陆页',
        id: 100000,
        parentId: 0,
    },
    {
        path: '/auth/list',
        name: 'authList',
        title: '用户列表',
        id: 100002,
        parentId: 0,
    },
    {
        path: '/role',
        name: 'role',
        title: '角色管理',
        id: 100001,
        parentId: 0,
    },
    {
        path: '/role/list',
        name: 'roleList',
        title: '角色列表',
        id: 110000,
        parentId: 100001,
    },
    {
        path: '/role/create',
        name: 'roleCreate',
        title: '角色创建',
        id: 110001,
        parentId: 100001,
    },
    {
        path: 'landinga',
        name: 'landing',
        title: '图片管理',
        id: 100003,
        parentId: 0,
    },
]