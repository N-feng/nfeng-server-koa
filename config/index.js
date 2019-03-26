const Path = require('path')

const Nf_DEBUG = process.env.NODE_ENV !== "production"

const config = {
    debug: Nf_DEBUG,
    // https 证书
    ssl: {
      keyPath: Path.resolve(__dirname, '../env/ssl/Nginx/2_nfeng.net.cn.key'),
      certPath: Path.resolve(__dirname, '../env/ssl/Nginx/1_nfeng.net.cn_bundle.crt'),
    },
}

module.exports = config
