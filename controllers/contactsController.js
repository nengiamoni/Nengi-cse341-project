const { ObjectId } = require('mongodb');
const db = require('../data/database');

exports.getAllContacts = async (req, res) => {
  try {
    const database = db.getDatabase();
    const contacts = await database.collection('contacts').find().toArray();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error });
  }
};

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
