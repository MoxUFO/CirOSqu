const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/CirOSqu');

module.exports = mongoose.connection;