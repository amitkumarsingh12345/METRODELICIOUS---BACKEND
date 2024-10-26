// ----------------ADMIN SCHEMA---------------------

const mongo = require('mongoose');
module.exports = new mongo.model('kumbh', {
    name: String,
    password: String
})

