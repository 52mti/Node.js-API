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
    }
    if (!sort) {
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

module.exports = APIFeatures;
