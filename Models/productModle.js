const mongoose = require("mongoose");
const product = mongoose.model("Product", {
  image: {
    type: String,
  },
  area: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  phNo: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = product;
