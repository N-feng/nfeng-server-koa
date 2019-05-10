// 引入模块
var COS = require('cos-nodejs-sdk-v5');
// 使用永久密钥创建实例
var cos = new COS({
    SecretId: process.env.SecretId,
    SecretKey: process.env.SecretKey
});

function getObjectUrl(fileName) {
    var url = cos.getObjectUrl({
        Bucket: process.env.Bucket, // Bucket 格式：test-1250000000
        Region: process.env.Region,
        Key: fileName,
        Expires: 60,
        Sign: true,
    }, function (err, data) {
        console.log(err || data);
    });
    console.log(url);
    return url
}

const getUrlPrefix = function () {
    // 请求用到的参数
    var Bucket = process.env.Bucket; // 存储桶名称，需修改
    var Region = process.env.Region; // 地域        
    var protocol = 'https://';
    var urlPrefix = protocol + Bucket + '.cos.' + Region + '.myqcloud.com/';
    return true ? 'https://cdn.nfeng.net.cn/' : urlPrefix;
}

class Signature {
    // 获取凭证
    static getAuthorization(options) {
        // 前端使用固定密钥计算签名（适用于前端调试，为了安全性，建议使用临时密钥生成签名）
        // 临时密钥参考链接：https://github.com/tencentyun/cos-js-sdk-v5
        var authorization = COS.getAuthorization({
            SecretId: process.env.SecretId,  // 你的固定密钥SecretId，需修改
            SecretKey: process.env.SecretKey,  // 你的固定密钥SecretKey，需修改
            Method: options.Method,
            Key: options.Key,
            Query: options.Query,
            Headers: options.Headers,
        });
        return authorization;
    }

    // 获取cdn上传地址
    static getCdnUpload(options) {
        var prefix = getBucketUrl();
        var Key = options.Key;
        var url = prefix + Key;
        return url;
    }

    // 获取签名
    static getSignature(options) {
        var authorization = this.getAuthorization(options)
        var url = this.getCdnUpload(options)
        return {
            Authorization: authorization,
            url: url
        }
    }

    // 删除文件
    static deleteObject(options) {
        var params = {
            Bucket: process.env.Bucket,
            Region: process.env.Region,
            Key: options.Key
        };

        return new Promise(resolve => {
            setTimeout(() => {
                cos.deleteObject(params, function(err, data) {
                    if (!err) {
                        resolve()
                    }
                })
            })
        })
    }
}


function Cos (ctx) {

    ctx.getBucketList = (ctx) => {
        const { prefix } = ctx.vals;
        const params = {
            Bucket: process.env.Bucket,
            Region: process.env.Region,
            Prefix: prefix
        };
        return new Promise(resolve => {
            cos.getBucket(params, function(err, data) {
                const urlPrefix = getUrlPrefix();
                const list = data.Contents.map(element => {
                    const name = element.Key.replace(prefix, '');
                    const url = urlPrefix + element.Key;
                    return { name, url };
                });
                const result = list.filter(item => item.name.length > 0);
                resolve(result);
            });
        }) 
    }

}

module.exports = function (options) {
    return async function (ctx, next) {
        Cos(ctx);
        await next();
    }
}