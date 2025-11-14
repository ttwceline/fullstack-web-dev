// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv').config(); // Load environment variables from .env

const app = express();

// --- Middleware Setup ---
// 1. Enable Cross-Origin Resource Sharing (Allows frontend to access backend)
app.use(cors({
    origin: 'http://localhost:5173' // Replace with your actual frontend URL (Vite default is 5173)
})); 
// 2. Body Parser: Allows server to read JSON from client requests
app.use(express.json());

// --- Database Connection ---
const db = process.env.MONGO_URI; 

if (!db) {
    console.error("FATAL ERROR: MONGO_URI is not defined in .env file.");
    process.exit(1);
}

mongoose.connect(db)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- Route Setup ---
const tasksRouter = require('./routes/tasks'); 
// Direct all requests starting with /api/tasks to the tasksRouter
app.use('/api/tasks', tasksRouter); 

// Basic Test Route
app.get('/', (req, res) => {
    res.send('Task Manager API Running');
});

// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));