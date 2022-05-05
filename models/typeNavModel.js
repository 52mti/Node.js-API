const mongoose = require('mongoose');

const typeNavSchema = mongoose.Schema({
  categoryChild: [Object],
  categoryName: {
    type: String,
    required: [true, 'A category must have a name'],
  },
  id: Number,
});

module.exports = mongoose.model('typeNav', typeNavSchema);
