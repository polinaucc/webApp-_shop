const mongoose = require('mongoose');

let ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  product_image: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Product', ProductSchema);
