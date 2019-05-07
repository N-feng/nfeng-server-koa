const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    'roleName': {type: String, default: ''},
    'roleType': {type: String, default: ''},
    'roleMenu': {type: Array, default: []},
    'permissions': {type: Array, default: []},
    'roleMenuList': {type: Array, default: []},
});

const RoleModel = mongoose.model('Role', RoleSchema, 'role');

module.exports = RoleModel;