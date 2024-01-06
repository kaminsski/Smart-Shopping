const mongoose = require('mongoose');

const CartScheme = mongoose.Schema(
    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        name: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
        image: {type: String, required: true},


    },{timestamps: true}
)

const Cart = mongoose.model("Cart", CartScheme)
module.exports = Cart