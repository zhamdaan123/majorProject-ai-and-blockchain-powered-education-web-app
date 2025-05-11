const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load env variables

const JWT_SECRET = process.env.JWT_SECRET || 'yourFallbackSecret';

// Register
// In /routes/auth.js
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log('📩 Incoming form data:', req.body);
  try {
    if (!username || !email || !password) {
      return res.status(400).send('All fields are required');
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send('User already exists');
    }

    const user = await User.create({ username, email, password });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // If request came from a form, redirect after successful signup
    if (req.headers['content-type'].includes('application/x-www-form-urlencoded')) {
      return res.redirect('/login');
    }

    res.status(201).json({
      user: { id: user._id, username, email },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Registration failed: ' + err.message);
  }
});


// Login
  router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT Token
    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // set to true in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});


// Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

module.exports = router;
