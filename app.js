const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// import routers
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// create express application
const app = express();

// use morgan module to log request result
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

// convert json request to regular javascript object
app.use(express.json());

// enable cross-origin resource sharing
app.use(cors());

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
