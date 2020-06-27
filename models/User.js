const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaUser = new Schema ({
    user_name: String,
    user_password: {
       type: String,
       minlength: 8,
    }
});

module.exports = mongoose.model('user', SchemaUser);