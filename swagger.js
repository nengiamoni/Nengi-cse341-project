const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'API for managing contacts',
    },
    servers: [
      {
        url: 'https://nengi-cse341-project.onrender.com', // Replace with your actual Render URL
      },
    ],
  },
  apis: ['./routes/*.js', './server.js'], // ✅ Include server.js for Hello World route
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
