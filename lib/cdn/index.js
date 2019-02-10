// 引入模块
var COS = require('cos-nodejs-sdk-v5');
// 使用永久密钥创建实例
var cos = new COS({
    SecretId: process.env.SecretId,
    SecretKey: process.env.SecretKey
});
// 分片上传
// cos.sliceUploadFile({
//     Bucket: process.env.Bucket,
//     Region: process.env.Region,
//     Key: '1.zip',
//     FilePath: './'
// }, function (err, data) {
//     console.log(err || data);
// });
// cos.getService(function(err, data) {
//     console.log(err || data);
// })
// cos.getObjectUrl({
//     Bucket: process.env.Bucket,
//     Region: process.env.Region,
//     Key: '1.jpg',
// }, function (err, data) {
//     console.log(err || data);
// })

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

// 请求用到的参数
var Bucket = process.env.Bucket; // 存储桶名称，需修改
var Region = process.env.Region; // 地域       
var protocol = 'https:';
var prefix = protocol + Bucket + '.cos.' + Region + '.myqcloud.com/';

var getBucketUrl = function () {
    // 请求用到的参数
    var Bucket = process.env.Bucket; // 存储桶名称，需修改
    var Region = process.env.Region; // 地域        
    var protocol = 'https:';
    var prefix = protocol + Bucket + '.cos.' + Region + '.myqcloud.com/';
    return prefix
}

class Signature {
    static init(fileName) {
        // var Key = fileName; // 这里指定上传目录和文件名，可根据情况修改
        // var url = prefix + Key;
        // const authorization = getAuthorization({Method: 'PUT', Key: Key})
        // return {
        //     Authorization: authorization,
        //     Url: url,
        // }
        // var url = getObjectUrl(fileName)

        const authorization = getAuthorization()
        const url = getBucketUrl()
        // var url = 'https://feng-1257981287.cos.ap-chengdu.myqcloud.com/logo.png?q-sign-algorithm=sha1&q-ak=AKIDcJrT97F04m2P8nGmgfDdqxbaEQ9SokaQ&q-sign-time=1548384071;1548385871&q-key-time=1548384071;1548385871&q-header-list=&q-url-param-list=&q-signature=b24e933724de12143b3b9666281eeb8ca3f8ded8&x-cos-security-token=61a63487c6f6abd4edcc583753a04171f59136a610001'
        return {
            Authorization: authorization,
            Url: url,
        }
    }
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
}

module.exports = Signature