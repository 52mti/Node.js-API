const TypeNav = require('../models/typeNavModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getAllTypes = async (req, res, next) => {
  try {
    // const data = await TypeNav.find({});
    const features = new APIFeatures(TypeNav, req.query);
    const data = await features.limitFields().query;

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
