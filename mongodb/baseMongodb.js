const ObjectId = require('mongoose').Types.ObjectId;

class baseMongodb {

    constructor () {}

    // 获取json对象
    static getJson(obj, keys) {
        const json = {};
        keys.forEach((key) => {
            if (typeof key == 'string') {
                json[key] = obj[key]
            } else {
                json[key[1]] = obj[0]
            }
        });
        return json;
    }

    // 返回Object对象
    static objId (id) {
        return ObjectId(id);
    }

}

module.exports = baseMongodb;