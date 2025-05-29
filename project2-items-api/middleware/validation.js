const { body, validationResult } = require('express-validator');

// Validation for Items
exports.validateItem = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isFloat({ gt: 0 }).withMessage('Price must be positive'),
  body('stock').isInt({ min: 0 }).withMessage('Stock must be non-negative'),
  body('category').notEmpty().withMessage('Category is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// ✅ Validation for Categories
exports.validateCategory = [
  body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  body('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
