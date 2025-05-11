// scripts/seedCourses.js
const mongoose = require('mongoose');
const Course = require('../models/course');
const User = require('../models/user');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  const admin = await User.findOne(); // Use the first available user

  if (!admin) {
    console.error('No users found in database. Please create a user first.');
    return;
  }

  const coursesData = [
    {
      title: 'Introduction to AI',
      description: 'A comprehensive intro to Artificial Intelligence.',
      category: 'AI',
      modules: [
        { title: 'History of AI', content: 'AI began with ancient myths and formal logic.' },
        { title: 'Machine Learning Basics', content: 'ML is a subset of AI focused on data-driven models.' },
      ],
    },
    {
      title: 'Web Development Fundamentals',
      description: 'Learn HTML, CSS, JavaScript, and how to build websites.',
      category: 'Web Development',
      modules: [
        { title: 'HTML Basics', content: 'HTML defines the structure of web pages.' },
        { title: 'CSS Styling', content: 'CSS makes web pages beautiful.' },
        { title: 'JavaScript Introduction', content: 'JS makes websites interactive.' },
      ],
    },
    {
      title: 'Blockchain Essentials',
      description: 'Understand the principles behind blockchain technology.',
      category: 'Blockchain',
      modules: [
        { title: 'What is Blockchain?', content: 'A decentralized ledger technology.' },
        { title: 'Smart Contracts', content: 'Self-executing contracts with code.' },
      ],
    },
    {
      title: 'Python for Beginners',
      description: 'Start programming with Python.',
      category: 'Programming',
      modules: [
        { title: 'Variables and Data Types', content: 'Learn about numbers, strings, and booleans.' },
        { title: 'Control Flow', content: 'Use if-statements and loops effectively.' },
        { title: 'Functions', content: 'Reusable blocks of code.' },
      ],
    },
    {
      title: 'Data Science Introduction',
      description: 'Explore how to extract knowledge from data.',
      category: 'Data Science',
      modules: [
        { title: 'Data Wrangling', content: 'Clean and prepare data for analysis.' },
        { title: 'Visualization with Matplotlib', content: 'Plot graphs and charts.' },
        { title: 'Basic Statistics', content: 'Understand mean, median, and standard deviation.' },
      ],
    },
  ];

  // Remove existing courses to avoid duplicates
  await Course.deleteMany({});

  // Create and save courses
  for (const courseData of coursesData) {
    const course = new Course({ ...courseData, createdBy: admin._id });
    await course.save();
    console.log(`Created course: ${course.title}`);
  }

  mongoose.disconnect();
  console.log('Database seeded with courses.');
}

seed();
