const express = require('express');
const { validateCategory } = require('../middleware/validation');
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoriesController');
const router = express.Router();
const { handleValidationErrors } = require('../middleware/errorHandler');

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', validateCategory, handleValidationErrors, createCategory);
router.put('/:id', validateCategory, handleValidationErrors, updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
