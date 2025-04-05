// app.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Loads environment variables from a .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
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


// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
