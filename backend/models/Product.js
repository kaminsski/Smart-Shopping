const mongoose = require('mongoose');

const ProductScheme = mongoose.Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true, default:0},
        image: {type: String, required: true},


    },{timestamps: true}
)

const Product = mongoose.model("Product", ProductScheme)
module.exports = Product