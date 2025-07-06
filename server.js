require('dotenv').config();

const connectDB = require('./config/db');
const loadModels = require('./utils/loadModels')
const app = require('./app');


const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);  // adapt your env var here
    loadModels();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
