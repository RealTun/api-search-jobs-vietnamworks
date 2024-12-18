const express = require('express');
const cors = require('cors');

const apiRoutes = require('./routes/api.routes');

const app = express();

// cors
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

module.exports = app;