const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

// router.get('/coursePage', verifyToken, (req, res) => {
//   res.render('coursePage') ;
// });

module.exports = router;
