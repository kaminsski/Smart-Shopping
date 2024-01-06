const express = require('express');
const router = express.Router()
const User = require('../models/User.js');
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth } = require('../middleware/authMid.js');


router.get("/", async(req,res)=>{
    try {
        let users = await User.find()
        res.json(users)
    } catch (error) {
        console.log(error)
}})

router.get("/:id", async(req,res)=>{
    const userId = req.params.id
    const user = await User.findById(userId)
    res.status(200).json(user)

})

router.put("/:id", async(req, res)=>{
    try {
        const userId = req.params.id
        const update = req.body.user
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            update,
            {new: true}
        )
        if (!updatedUser) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
        }
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
        res.send("not oke")
    }

})

router.delete("/:id", async(req, res)=>{
    try {
        const userId = req.params.id
        const deleteUser = await User.findByIdAndDelete(userId)
        res.status(200).json(deleteUser)
    } catch (error) {
        console.log(error)
        res.send("not oke")
    }

})

router.post("/register", async(req, res)=>{
    try {
        const {username, email, password} = req.body
        const hashed = await bcrypt.hash(password, 10)
        const newUser = new User({username, email, 
            password: hashed
        })
        await newUser.save() 
        const token = createToken(newUser._id);
        res.status(200).json({ token, newUser });
    } catch (error) {
        console.log(error)
        res.send("not oke")
    }

})

router.post("/login", async(req, res)=>{
    try {
        const { username, password } = req.body;
    
        const user = await User.findOne({ username });
    
        if (!user) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
        
        if (user) {
            const token = createToken(user._id);
            res.status(200).json({ token, user });
          }
      } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    });


    const createToken = (userId) => {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        return token;
    };
    
module.exports = router