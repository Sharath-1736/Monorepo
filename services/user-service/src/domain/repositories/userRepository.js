const User = require('../models/User');

module.exports = {
  async findByEmail(email) {
    return User.findOne({ email });
  },
  async create(userData) {
    return User.create(userData);
  },
  // ...other methods...
};
