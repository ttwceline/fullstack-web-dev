const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming User.js is in '../models'
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// IMPORTANT: This key MUST match the one in your auth.js middleware
const JWT_SECRET = 'w4h9V7xYpL3QmZ8tR2fN6jBvXsC1KdPzF0qW8eYtUaMvJrXn';

// --- /auth/register ---
// You must run this route once to create a user before you can log in.
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User already exists');
        }

        // 2. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create and save new user
        user = new User({
            email,
            password: hashedPassword,
        });
        await user.save();
        
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during registration');
    }
});


// --- /auth/login --- (Matches the route in Login.jsx)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Check for user existence
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // 2. Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }

        // 3. Generate JWT Token
        const payload = {
            user: {
                id: user.id, // Use Mongoose's .id for the user ID
                email: user.email,
            },
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Sends the token back to Login.jsx
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error during login');
    }
});

module.exports = router;