const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  biller: Object,
  client: Object,
  payment: Object,

  date: {
    type: String,
  },
  dateUnix: String,
  pending: String,
  draft: String,
  itemList: Array,
  total: Number,

  productionDescription: String,
});

module.exports = mongoose.model('Invoice', invoiceSchema);
