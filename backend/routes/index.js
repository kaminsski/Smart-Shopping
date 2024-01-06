const express = require('express');
const router = express.Router()
const { auth } = require('../middleware/authMid.js');


const productRouter = require("./products.js")
const userRouter = require("./user.js");
const cartRouter = require("./cart.js")

router.use("/user", userRouter)
router.use("/product", auth,productRouter)
router.use("/cart", cartRouter)


module.exports = router

