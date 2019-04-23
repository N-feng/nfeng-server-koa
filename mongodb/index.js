const mongoose = require('mongoose');

// 基本数据配置
const mongooseData = {
    url: process.env.MONGODB_HOST,
    port: process.env.MONGODB_PORT,
    name: process.env.MONGODB_ACCOUNT,
    pass: process.env.MONGODB_PASS,
    dataName: process.env.MONGODB_DB_NAME
};

const url = `mongodb://${mongooseData.name}:${mongooseData.pass}@${mongooseData.url}:${mongooseData.port}/${mongooseData.dataName}`;

console.log('Mongodb => ', url);
// 连接数据库
mongoose.connect(url, {useNewUrlParser:true});
// 获取数据库
const db = mongoose.connection;

db.on('connected', function () {
    console.log('Mongodb 连接成功');
});

db.on('error', function (e) {
    console.log('Mongodb 连接失败');
    console.log(e);
});

db.on('disconnected', function (e) {
    console.log('Mongodb 断开连接');
    console.log(e);
});