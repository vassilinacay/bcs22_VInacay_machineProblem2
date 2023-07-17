const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "User email is required"]
  },
  password: {
    type: String,
    required: [true, "User password is required"]
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  orderedProduct : [{
    productId: {
      type: String,
      required: [true, "Product ID is required"]
    },
    quantityOrdered: {
      type: Number,
      default: 1
    }
  }]
});

module.exports = mongoose.model('User', userSchema);