const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const db = require('../data/database');

// GET /contacts — get all contacts
router.get('/', async (req, res) => {
  try {
    const database = db.getDatabase();
    const contacts = await database.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contacts', error });
  }
});

// GET /contacts/:id — get contact by ID
router.get('/:id', async (req, res) => {
  const contactId = req.params.id;

  // Validate ObjectId
  if (!ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: 'Invalid contact ID format' });
  }

  try {
    const database = db.getDatabase();
    const contact = await database.collection('contacts').findOne({ _id: new ObjectId(contactId) });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch contact', error });
  }
});

module.exports = router;
