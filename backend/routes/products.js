const express = require('express');
const router = express.Router()
const Product = require("../models/Product.js")

router.get("/", async(req,res)=>{
    const products = await Product.find()
    res.status(200).json(products)

})

router.get("/:id", async(req,res)=>{
    const productId = req.params.id
    const product = await Product.findById(productId)
    res.status(200).json(product)

})

router.put("/:id", async(req, res)=>{
    try {
        const productId = req.params.id
        const update = req.body.updated
        const updatedProduct = await Product.findByIdAndUpdate(
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
        const deleteProduct = await Product.findByIdAndDelete(productId)
        res.status(200).json(deleteProduct)
    } catch (error) {
        console.log(error)
        res.send("not oke")
    }

})

router.post("/", async(req, res)=>{
    try {
        const {name, image, price, quantity} = req.body
        const newProduct = new Product({name, image, price, quantity})
        await newProduct.save() 
        res.status(200).json(newProduct)
    } catch (error) {
        console.log(error)
        res.send("not oke")
    }

})

module.exports = router