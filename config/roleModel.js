module.exports = {
    typeList: [
        {
            name: '一般用户',
            value: 'normal',
        },
        {
            name: '会员',
            value: 'member',
        },
        {
            name: '管理',
            value: 'admin',
        },
        {
            name: '最高权限',
            value: 'root',
        }
    ],
    menuList: [
        {
            path: '/public/landing',
            name: 'landing',
            title: '登陆页',
            id: 100000,
            parentId: 0,
        },
        {
            path: '/auth/list',
            name: 'authList',
            title: '用户管理',
            id: 100001,
            parentId: 0,
        },
        {
            path: '/role',
            name: 'role',
            title: '角色管理',
            id: 100002,
            parentId: 0,
        },
        // {
        //     path: '/role/list',
        //     name: 'roleList',
        //     title: '角色列表',
        //     id: 110000,
        //     parentId: 100002,
        // },
        // {
        //     path: '/role/create',
        //     name: 'roleCreate',
        //     title: '角色创建',
        //     id: 110001,
        //     parentId: 100002,
        // },
        {
            path: '/img/list',
            name: 'imgList',
            title: '图片管理',
            id: 100003,
            parentId: 0,
        },
        {
            path: '/task/list',
            name: 'taskList',
            title: '任务管理',
            id: 100004,
            parentId: 0,
        },
    ],
    permissionsList: [
        {
            path: '/auth/list',
            name: 'authList',
            title: '用户列表',
        },
        {
            path: '/role/list',
            name: 'roleList',
            title: '角色列表',
        },
        {
            path: '/role/detail',
            name: 'roleDetail',
            title: '角色编辑',
        },
        {
            path: '/role/save',
            name: 'roleSave',
            title: '角色保存',
        },
        {
            path: '/role/delete',
            name: 'roleDelete',
            title: '角色删除',
        },
        {
            path: '/img/list',
            name: 'imgList',
            title: '图片列表',
        },
    ]
}