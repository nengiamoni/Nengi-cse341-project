const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let database;

const initDb = (callback) => {
  if (database) {
    console.log('Db is already initialized!');
    return callback(null, database);
  }

 MongoClient.connect(process.env.MONGODB_URL)
  .then((client) => {
    database = client.db('cse342db'); // specify the database name here explicitly
    console.log('Database connected');
    callback(null, database);
  })
  .catch((err) => {
    callback(err);
  });

};

const getDatabase = () => {
  if (!database) {
    throw Error('Database not initialized');
  }
  return database;
};

module.exports = {
  initDb,
  getDatabase
};
