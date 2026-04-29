const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/resumes', resumeRoutes);

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/careerforge';

if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
  console.warn('⚠️ WARNING: OPENAI_API_KEY is missing or using placeholder. AI features will fail.');
}

console.log('⏳ Connecting to MongoDB...');
mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 2000 })
  .then(() => {
    console.log('✅ MongoDB Connected Successfully');
    app.locals.dbConnected = true;
  })
  .catch(err => {
    console.error('❌ MongoDB Offline: Switching to Mock Memory Mode');
    console.log('ℹ️ Tip: Start the MongoDB Service in Windows "Services" to use a real database.');
    app.locals.dbConnected = false;
  });

// Basic Route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'API is running', 
    mongodb: app.locals.dbConnected ? 'Online' : 'Offline (Mock Mode Active)',
    ai: !!process.env.OPENAI_API_KEY ? 'Configured' : 'Mock Mode Active'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n🚀 CAREERFORGE PRO BACKEND STARTED`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`📂 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});
