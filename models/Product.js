const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaProduct = new Schema ({
    product_id: Schema.Types.ObjectId, // The product_id used here as a business identity
    product_name: String,
    product_category: String,
    product_price: Number,
    product_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('product', SchemaProduct);