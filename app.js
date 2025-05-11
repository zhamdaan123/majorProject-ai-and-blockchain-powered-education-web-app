// app.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const courseRoutes = require('./routes/courses');
const dashboardRoutes = require('./routes/dashboard');
const cookieParser = require('cookie-parser');

const verifyToken = require('./middleware/authMiddleware.js');


require('dotenv').config(); // Loads environment variables from a .env file



const app = express();
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser()); // Add this line

app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes);
app.use('/api/courses', courseRoutes);
app.use('/', dashboardRoutes);
app.use('/courses', courseRoutes);

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Specify the 'views' folder

// Connect to MongoDB (Make sure you have a MongoDB URI in your .env file)
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("Connected to MongoDB");
})
.catch(err => {
  console.log("Failed to connect to MongoDB", err);
});

// Basic route to render an EJS view
app.get('/', (req, res) => {
  res.render('landing');
});
app.get('/signup', (req, res) => {
  res.render('auth/signup');
});
app.get('/login', (req, res) => {
  res.render('auth/login');
});
app.get('/coursePage', verifyToken,async(req, res) => {
  res.render('coursePage');
});


// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
