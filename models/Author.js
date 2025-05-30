const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters long']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters long']
  },
  birthDate: {
    type: Date,
    required: [true, 'Birth date is required']
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required'],
    trim: true
  },
  biography: {
    type: String,
    required: [true, 'Biography is required'],
    minlength: [20, 'Biography must be at least 20 characters long']
  },
  awards: [{
    name: String,
    year: Number
  }],
  website: {
    type: String,
    trim: true,
    match: [/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/, 'Please enter a valid URL']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Author', authorSchema); 