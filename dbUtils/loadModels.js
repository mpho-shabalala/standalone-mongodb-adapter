const fs = require('fs');
const path = require('path');

const loadModels = () => {
  const modelsDir = path.join(__dirname, '../models');

  fs.readdirSync(modelsDir).forEach(file => {
    if (file.endsWith('.js')) {
      require(path.join(modelsDir, file));
    }
  });
};

module.exports = loadModels;