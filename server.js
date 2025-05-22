const express = require('express');
const mongodb = require('./data/database');
const { swaggerUi, swaggerSpec } = require('./swagger'); // ✅ Import Swagger
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing JSON bodies

// ✅ Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Hello World
 *     description: Returns a welcome message from the CSE341 Project.
 *     responses:
 *       200:
 *         description: A successful response
 */
app.get('/', (req, res) => {
  res.send('Hello World from CSE341 Project!');
});

// ✅ Main API route
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
