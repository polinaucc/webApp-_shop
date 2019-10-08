const mongoose = require('mongoose');

let FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  appeal_type: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  attachment: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Form', FormSchema);
