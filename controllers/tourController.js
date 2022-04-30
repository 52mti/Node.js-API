const Tour = require('../models/tourModel');

// convert route to request query
exports.aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

class APIFeatures {
  // model 应该为模型构造函数，queryObj 应该为 request.query 转换过来的对象
  constructor(model, queryObj) {
    this.model = model;
    this.query = model.find();
    this.queryObj = queryObj;
  }

  filter() {
    // 1) 如果我们的 queryObj 不是在指定 field 和 value，就需要过滤掉这些内容
    const { page, limit, sort, fields, ...queryObj } = this.queryObj;

    // 2) process filtered object
    const queryStr = JSON.stringify(queryObj).replace(
      /\b(gte|gt|lt|lte)\b/g,
      (match) => `$${match}`
    );
    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    const { sort } = this.queryObj;
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort({ createdAt: 'desc' });
    }

    return this;
  }

  limitFields() {
    const { fields } = this.queryObj;

    if (fields) {
      const selectBy = fields.split(',').join(' ');
      this.query = this.query.select(selectBy);
    }
    if (!fields) this.query = this.query.select('-__v');

    return this;
  }

  async paginate() {
    const page = Number(this.queryObj.page) || 1;
    const limit = Number(this.queryObj.limit) || 100;
    const skipNum = (page - 1) * limit;
    this.query = this.query.skip(skipNum).limit(limit);

    const tourNum = await this.model.countDocuments();
    if (page !== 1 && skipNum >= tourNum) {
      throw new Error('The page does not exist');
    }

    return this;
  }
}

exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour, req.query);
    // await error from paginate method
    await features.filter().limitFields().sort().paginate();

    const toursData = await features.query;

    res.status(200).json({
      status: 'success',
      requestAt: req.requestTime,
      results: toursData.length,
      data: { tours: toursData },
    });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { tour },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndRemove(req.params.id);
    res.status(204).json({
      stats: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
