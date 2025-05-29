const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  description: {
    type: String,
    required: true,
    minlength: 10
  }
});

module.exports = mongoose.model('Category', categorySchema);
