const Cart = require('../models/Cart');

module.exports = {
  async list() {
    return Cart.find().sort({ createdAt: -1 });
  },
  async create(payload) {
    return Cart.create(payload);
  },
  async get(id) {
    return Cart.findById(id);
  },
  async findByUserId(userId) {
    return Cart.findOne({ userId });
  },
  async update(cartId, payload) {
    return Cart.findByIdAndUpdate(cartId, payload, { new: true });
  },
  async delete(cartId) {
    return Cart.findByIdAndDelete(cartId);
  }
};