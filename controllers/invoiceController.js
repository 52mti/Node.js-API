const Invoice = require('../models/invoiceModel');

exports.getInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
    });

    res.status(200).json({
      status: 'success',
      data: { invoice },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);
    res.status(200).json({
      status: 'success',
      data: { invoice },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
