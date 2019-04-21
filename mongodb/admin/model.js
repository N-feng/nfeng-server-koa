const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    'username': {type: String, default: ''},
    'password': {type: String, default: ''},
    'loginErrNum': {type: Number, default: 0},  // 登录错误次数
    'createTime': {type: Date, default: new Date()},
    'avatar': {type: String, default: ''}
});

const Admin = mongoose.model('Admin', adminSchema, 'admins');

module.exports = Admin;