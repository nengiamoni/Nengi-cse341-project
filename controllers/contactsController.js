const { ObjectId } = require('mongodb');
const db = require('../data/database');

// GET all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const database = db.getDatabase();
    const contacts = await database.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
};

// GET contact by ID
exports.getContactById = async (req, res) => {
  const contactId = req.params.id;

  if (!ObjectId.isValid(contactId)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const database = db.getDatabase();
    const contact = await database.collection('contacts').findOne({ _id: new ObjectId(contactId) });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error });
  }
};

// POST create new contact
exports.createContact = async (req, res) => {
  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const database = db.getDatabase();
    const result = await database.collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error });
  }
};

// PUT update existing contact
exports.updateContact = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  const { firstName, lastName, email, favoriteColor, birthday } = req.body;

  if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const database = db.getDatabase();
    const result = await database.collection('contacts').replaceOne(
      { _id: new ObjectId(id) },
      { firstName, lastName, email, favoriteColor, birthday }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error });
  }
};

// DELETE contact by ID
exports.deleteContact = async (req, res) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format' });
  }

  try {
    const database = db.getDatabase();
    const result = await database.collection('contacts').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error });
  }
};
