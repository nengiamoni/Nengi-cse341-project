const swaggerAutogen = require('swagger-autogen')();
const doc = {
  info: {
    title: 'Project 2 API',
    description: 'API for items and categories'
  },
  host: 'localhost:3000', // change this to Render domain after deploy
  schemes: ['http']
};
const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
