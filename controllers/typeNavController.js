const TypeNav = require('../models/typeNavModel');

exports.getAllTypes = async (req, res, next) => {
  try {
    const data = await TypeNav.find();
    res.status(200).json({
      status: 'success',
      data,
    });
    next();
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
