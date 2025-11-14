// File: index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); 

// IMPORTANT: Check the path based on your file structure!
// Your structure: /Backend/routes/authRoutes.js
const authRoutes = require('./routes/authRoutes'); 
const taskRouter = require('./routes/task'); // For /api/tasks

const app = express();
const PORT = 3000;

dotenv.config();

// --- Database Connection (Already working) ---
const DB_URL = process.env.DB_URL || 'mongodb+srv://cttw:taskapp25@cluster0.fcrbble.mongodb.net/?appName=Cluster0'; 
mongoose.connect(DB_URL)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));


// --- ⚠️ CRITICAL MIDDLEWARE FIXES ⚠️ ---
app.use(cors()); 
// 1. This is NECESSARY to parse JSON bodies from POST requests.
app.use(express.json()); 


// --- ROUTE MOUNTING ---
// 2. This mounts authRoutes.js at the base path /auth
// This makes router.post('/register') resolve to POST /auth/register
app.use('/auth', authRoutes); 

// Mount the protected task routes at /api/tasks
app.use('/api/tasks', taskRouter); 

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// --- Path Test ---
try {
    const testRoute = require('./routes/authRoutes');
    console.log("SUCCESS: authRoutes file was found and loaded.");
} catch (error) {
    console.error("FAILURE: Could not find or load authRoutes.js. Check the path! Error:", error.message);
}
// index.js

// ... imports (express, mongoose, dotenv)

dotenv.config(); // Loads variables from .env file

// Mongoose connects using the DB_URL variable
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// ... rest of your server code