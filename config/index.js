// 是否是调试模式
const NF_DEV = process.env.NODE_ENV === 'development';

const NF_92 = process.env.NODE_ENV === '92';

const NF_94 = process.env.NODE_ENV === '94';

const config = {

    debug: NF_DEV || NF_92 || NF_94

};

module.exports = config;