const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

// Initialize app
const app = express();

// Passport config
require('./config/passport');

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Swagger base URL
const baseUrl = process.env.NODE_ENV === 'production'
  ? process.env.RENDER_EXTERNAL_URL || 'https://nengi-cse341-project.onrender.com'
  : 'http://localhost:3000';

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CSE341 Project API',
      version: '1.0.0',
      description: 'A REST API for managing books, authors, and contacts',
    },
    servers: [
      {
        url: baseUrl,
        description: process.env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected');
});

// Routes
const bookRoutes = require('./routes/book');
const authorRoutes = require('./routes/authors');
const contactRoutes = require('./routes/contacts');
const authRoutes = require('./routes/auth');

app.use('/api/books', bookRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/auth', authRoutes);

// Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
