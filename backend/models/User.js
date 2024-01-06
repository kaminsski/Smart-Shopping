const mongoose = require('mongoose');

// Define a subdocument schema for Product
const ProductSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
        image: {type: String, required: true},


    },{timestamps: true}
);

const UserScheme = mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, default: "user", enum: ["user", "admin"] },
        cart: [ProductSchema], // Array of embedded Product subdocuments
        balance: { type: String, default: 100 },
        total: { type: Number, default: 0 },
        orders: [Object], // Array of embedded Product subdocuments
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserScheme);
module.exports = User;
