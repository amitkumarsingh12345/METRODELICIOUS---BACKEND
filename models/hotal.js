// ----------------PRODUCT SCHEMA---------------------

const mongo = require('mongoose');
module.exports = new mongo.model('hotal', {
  name: String,
  location: String,
  discription: String,
  image: String
});
