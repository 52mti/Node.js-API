// 配置环境变量
require('dotenv').config({ path: './configs.env' });
const mongoose = require('mongoose');
const app = require('./app');

// 处理连接到mongodb的url
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<NAME>', process.env.DATABASE_NAME);

const port = process.env.PORT || 3000;

// 用mongoose中间件连接mongodb数据库
mongoose.connect(DB).then(() => console.log('DB connectted ✌'));

app.listen(port, () =>
  console.log(`port: ${port}; database: ${process.env.DATABASE_NAME}`)
);
