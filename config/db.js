const mongoose = require('mongoose');

const connectDB = async (uri) => {

  try {
      // Step 1: Connect to DB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

     // Step 2: Log success
    console.log(' MongoDB Connected');
    process.on('SIGINT', async () => {
        await mongoose.disconnect();
        console.log('📴 MongoDB disconnected (SIGINT)');
        process.exit(0);
    });

    // Step 3: Handle shutdowns
    process.on('SIGTERM', async () => {
        await mongoose.disconnect();
        console.log(' MongoDB disconnected (SIGTERM)');
        process.exit(0);
    });

  } catch (error) {
    console.error(' MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
