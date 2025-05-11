const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Optional: Define a subdocument schema for course progress
const courseProgressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // This assumes we have a Course model
    required: true,
  },
  completedModules: [String], // e.g., list of completed module titles or IDs
  lastViewedModule: {
    type: String,
    default: null,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  courses: [courseProgressSchema], // New field: tracks enrolled courses and progress
}, {
  timestamps: true // Optional: adds createdAt and updatedAt
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
