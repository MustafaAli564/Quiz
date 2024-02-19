var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Users = require('../models/User');

router.post("/signup", async(req,res) => {
    try{
        const{email, password} = req.body
        let user = await Users.findOne({email})
        if (user) return res.json({msg: "User exists"})
        await Users.create({...req.body, password: await bcrypt.hash(password, 6)});

        return res.json({msg: "Created"})
    }catch(error) {
        console.error(error);
    }
});

router.post("/login", async(req, res) => {
    try{
        const{email, password} = req.body
        
        const user = await Users.findOne({email})
        if (!user) return res.json({msg: "User not found"})

        const pw = await bcrypt.compare(password, user.password)
        if (!pw) return res.json({msg: "Incorrect Password"})

        const token = jwt.sign({
            email, 
            createdAt: new Date(),
            age: user.age,
        }, "My secret", {expiresIn: "1d"});

        res.json({
            msg: "logged in", 
            token
        })
    } catch(error) {
        console.error(error)
    }
});

module.exports = router;