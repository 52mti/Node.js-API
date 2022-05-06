const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// 导入路由器
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const typeNavRouter = require('./routes/typeNavRoutes');

const app = express();

// ---------------开始添加 request & response middleware-----------------

// 在开发模式下，利用 morgan 在终端记录每次 request 的信息（method、path、status、time）
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

// 转换request格式， json request 👉 object request
app.use(express.json());

// 关闭跨域保护
app.use(cors());

// 路由一定要得是最后的 middleware（因为 middleware 最后一步一般是：书写并发送response）
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/typeNav', typeNavRouter);

module.exports = app;
