require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const itemsRoutes = require('./routes/items');
const categoriesRoutes = require('./routes/categories'); // ✅ Add this once created
const errorHandler = require('./middleware/errorHandler');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json'); // ✅ Run swagger.js to generate this

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/items', itemsRoutes);
app.use('/api/categories', categoriesRoutes); // ✅ Add this once created

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
