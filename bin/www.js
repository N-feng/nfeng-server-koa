/*
* 别名
* */
require('module-alias/register');

/*
* 环境变量
* */
// 加载所有环境下的环境变量
require('dotenv').config({ path: './env/.env' });
switch (process.env.NODE_ENV) {
    case 'development': // 开发环境
        require('dotenv').config({ path: './env/development.env' });
        break;
    case 'production': // 生产环境
        require('dotenv').config({ path: './env/production.env' });
        break;
    case '92': // 92环境
        require('dotenv').config({ path: './env/92.env' });
        break;
    case '94': // 94环境
        require('dotenv').config({ path: './env/94.env' });
        break;
}

/*
* 项目
* */
require('../app');