const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  isDeletedby: { type: String },
  isDeletedint: { type: Number },
  name : { type: String, required: true }, 
  address : { type: String, required: true },
  phoneno : { type: String, required: true },
  owner : { type: String, required: true },
  establishedDate : { type: Date, required: true },
  GSTNumber : { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Store', schema);
