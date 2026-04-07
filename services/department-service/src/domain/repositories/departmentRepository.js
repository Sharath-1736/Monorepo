const Department = require('../models/Department');

module.exports = {
  async list() {
    return Department.find().sort({ createdAt: -1 });
  },
  async create(payload) {
    return Department.create(payload);
  },
};
