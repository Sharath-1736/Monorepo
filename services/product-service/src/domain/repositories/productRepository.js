const Product = require('../models/Product');

module.exports = {
  async list() {
    return Product.find().sort({ createdAt: -1 });
  },
  async create(payload) {
    return Product.create(payload);
  },
};
