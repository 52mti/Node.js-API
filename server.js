// config environment variables
require('dotenv').config({ path: './configs.env' });
const mongoose = require('mongoose');
const app = require('./app');

// get connect url
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
).replace('<NAME>', process.env.DATABASE_NAME);

const port = process.env.PORT || 3000;

// connect mongoose to database
mongoose.connect(DB).then(() => console.log('DB connectted ✌'));

app.listen(port, () => console.log(`App running on port ${port}...`));
