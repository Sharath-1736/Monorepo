const Pricing = require('../models/Pricing');

module.exports = {
  async list() {
    return Pricing.find().sort({ createdAt: -1 });
  },
  async create(payload) {
    return Pricing.create(payload);
  },
};
