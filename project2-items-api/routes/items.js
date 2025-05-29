const express = require('express');
const router = express.Router();
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} = require('../controllers/itemsController');
const { validateItem } = require('../middleware/validation');

router.get('/', getItems);
router.post('/', validateItem, createItem);
router.put('/:id', validateItem, updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
