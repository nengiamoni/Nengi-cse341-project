const express = require('express');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing JSON bodies

app.use('/contacts', require('./routes/contacts'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and Node is running on port ${port}`);
    });
  }
});
