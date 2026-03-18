const mongoose = require('mongoose');

module.exports = async (req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({
    ready,
    timestamp: new Date().toISOString(),
  });
};
