// ----------------PRODUCT SCHEMA---------------------

const mongo = require('mongoose');
module.exports = new mongo.model('thali', {
  name: String,
  price: Number,
  qty: {
    type: String,
    default: 1
  },
  discription: String,
  image: String
});
