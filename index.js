// Core DB connection function
const connectDB = require('./config/db');

// Model Auto-loader
const loadModels = require('./loadModels');

// Services
const userService = require('./dbServices/user.service');



// Export everything for the host backend
module.exports = {
  connectDB,     // let backend decide when/how to call
  loadModels,    // backend can trigger when ready
  userService,   // available to API layer
};