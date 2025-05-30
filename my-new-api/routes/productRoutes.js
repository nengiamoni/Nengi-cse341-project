const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateProduct = require('../middleware/validateProduct');

router.post('/', validateProduct, productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
// Add similar routes for PUT and DELETE

module.exports = router;