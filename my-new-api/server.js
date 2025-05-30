require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Add this file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority'
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit on DB connection failure
});

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/products', productRoutes); // Changed from collection1
app.use('/api/users', userRoutes);       // Changed from collection2

// 404 Handler for undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Enhanced Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    // Mongoose Validation Errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Failed',
            details: Object.values(err.errors).map(e => e.message)
        });
    }

    // MongoDB Duplicate Key
    if (err.code === 11000) {
        return res.status(409).json({
            error: 'Duplicate Key',
            field: Object.keys(err.keyPattern)[0]
        });
    }

    // Invalid ObjectID
    if (err.kind === 'ObjectId') {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Default to 500 for other errors
    res.status(500).json({ 
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});