const crypto = require('crypto');

module.exports = function(str) {
    let data_str = str + process.env.MD5_KEY;
    const hash = crypto.createHash('md5');
    hash.update(data_str);
    return hash.digest('hex');
}