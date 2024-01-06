const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router()

router.get("/", async(req,res)=>{
    const products = await Cart.find()
    res.status(200).json(products)

})

router.get("/:id", async(req,res)=>{
    const productId = req.params.id
    const product = await Cart.findById(productId)
    res.status(200).json(product)

})

router.put("/:id", async(req, res)=>{
    try {
        const productId = req.params.id
        const update = req.body
        const updatedProduct = await Cart.findByIdAndUpdate(
            productId,
            update,
            {new: true}
        )
        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error)
        res.send("not oke")
    }

})

router.delete("/:id", async(req, res)=>{
    try {
        const productId = req.params.id
        const deleteProduct = await Cart.findByIdAndDelete(productId)
        res.status(200).json(deleteProduct)
    } catch (error) {
        console.log(error)
        res.send("not oke")
    }

})

router.post("/", async(req, res)=>{
    try {

        const {user, name, image, price, quantity} = req.body
        const newProduct = new Cart({user, name, image, price, quantity})
        await newProduct.save() 
        res.status(200).json(newProduct)
    } catch (error) {
        console.log(error)
        res.send("not oke")
    }

})

module.exports = router