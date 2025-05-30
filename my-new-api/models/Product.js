const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, enum: ['Electronics', 'Clothing', 'Food'], required: true },
  stock: { type: Number, min: 0, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  features: { type: [String], default: [] } // 7th field
});

module.exports = mongoose.model('Product', productSchema);