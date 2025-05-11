const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const User = require('../models/user');
const Course = require('../models/course');

// Dashboard route - only accessible with a valid token
router.get('/dashboard', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('username email');
    const courses = await Course.find({}); // You can later filter to show only enrolled ones

    res.render('dashboard', {
      user,
      courses, // ✅ You forgot to pass this
      activePage: 'dashboard'
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
