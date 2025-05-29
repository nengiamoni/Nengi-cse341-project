const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  available: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = model('Item', itemSchema);
