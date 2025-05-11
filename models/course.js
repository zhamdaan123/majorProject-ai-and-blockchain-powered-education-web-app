const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String, // Can be plain text, markdown, or even HTML
    required: true,
  },
  videoUrl: {
    type: String, // Optional: for embedded video lessons
  }
}, { _id: false });

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String, // Optional: e.g., 'Web Development', 'Data Science'
  },
  modules: [moduleSchema], // Array of course modules
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Course', courseSchema);
