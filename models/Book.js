const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [2, 'Title must be at least 2 characters long']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: [true, 'Author is required']
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true,
    trim: true
  },
  publicationYear: {
    type: Number,
    required: [true, 'Publication year is required'],
    min: [1000, 'Publication year must be valid'],
    max: [new Date().getFullYear(), 'Publication year cannot be in the future']
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    enum: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 'Romance', 'Biography', 'History', 'Other']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters long']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema); 