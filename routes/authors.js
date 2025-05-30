const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Author = require('../models/Author');

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of all authors
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author details
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - birthDate
 *               - nationality
 *               - biography
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', [
  body('firstName').trim().isLength({ min: 2 }),
  body('lastName').trim().isLength({ min: 2 }),
  body('birthDate').isISO8601(),
  body('nationality').trim().notEmpty(),
  body('biography').trim().isLength({ min: 20 }),
  body('website').optional().isURL(),
  body('awards').optional().isArray()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const author = new Author(req.body);
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       404:
 *         description: Author not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put('/:id', [
  body('firstName').optional().trim().isLength({ min: 2 }),
  body('lastName').optional().trim().isLength({ min: 2 }),
  body('birthDate').optional().isISO8601(),
  body('nationality').optional().trim().notEmpty(),
  body('biography').optional().trim().isLength({ min: 20 }),
  body('website').optional().isURL(),
  body('awards').optional().isArray()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    res.json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 