const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/storeDB');
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ Connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;