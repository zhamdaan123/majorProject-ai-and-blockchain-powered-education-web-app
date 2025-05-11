const express = require('express');
const Course = require('../models/course');
const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});


// Route: GET /courses/:id
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).send('Course not found');

    res.render('coursePage', { course });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
