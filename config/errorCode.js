module.exports = {

    // admin ==========================================
    admin: {
        user_exist:     { code: 10001, msg: '用户已经存在' },
        user_nonentity: { code: 10002, msg: '用户不存在' },
        login_err:      { code: 10003, msg: '账号或者密码错误' },
        login_timeout:  { code: 10005, msg: '登录超时，请重新登录' },
        login_max:      { code: 10006, msg: '登录错误次数超出上限' },
        login_lock:     { code: 10007, msg: '账号已经被锁定' },
        admin_err:      { code: 10008, msg: '必须是管理员才可以' }
    },

    // role
    role: {
        role_exist: { code: 500, msg: '角色已经存在' },
        role_nonentity: { code: 500, msg: '角色不存在' },
    },

    // token ==========================================
    token: {
        failure:        { code: 13002, msg: 'token 失效' },
        outOfDate:      { code: 401, msg: 'token 过时' }
    },

    // 参数错误 ==========================================
    parameterErr:       { code: 14100, msg: '参数错误' },

    // mongoose ==========================================
    mongoErr:           { code: 14200, msg: 'mongoose错误' },

    // 未知错误 ==========================================
    unknownErr:         { code: 14300, msg: '未知错误错误' },

};