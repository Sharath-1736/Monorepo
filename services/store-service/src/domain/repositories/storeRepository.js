const Store = require('../models/Store');

module.exports = {
  async list() {
    return Store.find().sort({ createdAt: -1 });
  },
  async create(payload) {
    return Store.create(payload);
  },
  async get(id) {
    return Store.findById(id);
  },
  async update(id, payload) {
    return Store.findByIdAndUpdate(id, payload, { new: true });
  },
  async delete(id) {
    return Store.findByIdAndDelete(id);
  },
  async restore(id) {
    return Store.findByIdAndUpdate(id, { isDeleted: false }, { new: true });
  }, 
};
