const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaBusiness = new Schema ({
    business_name: String,
    business_founded: Number,
});

module.exports = mongoose.model('business', SchemaBusiness);