const Path = require('path')

const config = {
    debug: process.env.DEBUG,
    // https 证书
    ssl: {
      keyPath: Path.resolve(__dirname, '../env/ssl/Nginx/2_nfeng.net.cn.key'),
      crtPath: Path.resolve(__dirname, '../env/ssl/Nginx/1_nfeng.net.cn_bundle.crt'),
    },
}

module.exports = config
