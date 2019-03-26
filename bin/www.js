/*
* 别名
* */
require('module-alias/register');

/*
* 环境变量
* */
// 加载所有环境下的环境变量
require('dotenv').config({ path: './env/.env' });
console.log(`NODE_ENV is ${process.env.NODE_ENV}`)
switch (process.env.NODE_ENV) {
    case 'development': // 开发环境
        require('dotenv').config({ path: './env/development.env' });
        break;
    case 'production': // 生产环境
        require('dotenv').config({ path: './env/production.env' });
        break;
    case 'nginx': // 生产环境的nginx配置下
        require('dotenv').config({ path: './env/nginx.env' });
        break;
}

/*
* 项目
* */
require('../app');
