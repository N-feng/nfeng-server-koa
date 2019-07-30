// 引入模块
var COS = require('cos-nodejs-sdk-v5')
// 使用永久密钥创建实例
var cos = new COS({
  SecretId: process.env.SecretId,
  SecretKey: process.env.SecretKey
})
const fs = require('fs')

class ImgCos {
  constructor() { }

  static async addImg(file, fileName) {
    return new Promise((resolve, reject) => {
      cos.putObject({
        Bucket: process.env.Bucket,
        Region: process.env.Region,
        Key: 'upload/' + fileName,
        Body: fs.createReadStream(file.path), // 这里传入前缀
      }, function (err, data) {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  static async deleteImg(fileName) {
    return new Promise((resolve, reject) => {
      cos.deleteObject({
        Bucket: process.env.Bucket,
        Region: process.env.Region,
        Key: 'upload/' + fileName,
      }, function (err, data) {
        if (err) reject(err)
        resolve(data)
      });
    })
  }

  static async getImgList() {
    return new Promise((resolve, reject) => {
      cos.getBucket({
        Bucket: process.env.Bucket,
        Region: process.env.Region,
        Prefix: 'upload/', // 这里传入列出的文件前缀
      }, function (err, data) {
        if (err) reject(err)
        resolve(data.Contents.filter(item => item.Key !== 'upload/'))
      });
    })
  }
}

module.exports = ImgCos
