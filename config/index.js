// 是否是调试模式
const NF_DEBUG = process.env.NODE_ENV === 'development';

const config = {

    debug: NF_DEBUG

};

module.exports = config;