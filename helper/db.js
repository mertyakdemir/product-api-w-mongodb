const mongoose = require('mongoose');

module.exports = () => {
     mongoose.connect('mongodb://product_db:mongodbexample1337@ds055545.mlab.com:55545/heroku_s2qj3brc', { useNewUrlParser: true, useUnifiedTopology: true });
     
     mongoose.Promise = global.Promise;

};