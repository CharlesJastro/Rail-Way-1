const router= require('express').Router();
const User= require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()
router.post('/', async(req,res)=>{

    try{
    const {email, password}=req.body;

        //Validation
        if(!email || !password)
        return res.status(400).json({errorMessage: "Please enter the required fields"});

        if(password.length <6)
        return res.status(400).json({errorMessage:"Plese enter a password atleast 6 characters."});

        const existingUser=await User.findOne({email});
        if(existingUser) 
        return res.status(400).json({
            errorMessage:"Accounts with this email already exists."
        })
        //HASH PASSWORD
    
        const salt= await bcrypt.genSalt();
        const passwordHash= await bcrypt.hash(password, salt)

        //SAVE TO DB
        const newUser= new User({
            email, passwordHash
        })
        const savedUser= newUser.save();

//SIGN THE TOKEN
        const token=jwt.sign({
            user: savedUser._id
        }, process.env.JWT_SECRET);
        
        //SENG THE TOKEN
        res.cookie("token",token,{
            httpOnly:true,
        }).send();
        

    }catch(err){
        console.error(err);
        res.send(500).send();
    }
    
})
//LOGIN
router.post('/login', async(req,res)=>{
    try{
        const {email, password}=req.body;
        //VALIDATION
        if(!email || !password)
        return res.status(400).json({errorMessage: "Please enter the required fields"});

        const existingUser = await User.findOne({email});
        if(!existingUser)
        return res.status(401).json({errorMessage:"Wrong email or password"});

        const passwordCorrect= await bcrypt.compare(password, existingUser.passwordHash);
        if(!passwordCorrect)
        return res.status(401).json({errorMessage:"Wrong email or password"});

        //SIGN THE TOKEN
        const token=jwt.sign({
            user: existingUser._id
        }, process.env.JWT_SECRET);
        
        //SENG THE TOKEN
        res.cookie("token",token,{
            httpOnly:true,
        }).send();

    }catch(err){
        console.error(err);
        res.send(500).send();
    }
});
router.get("/logout",(req,res)=>{
    res.cookie("token", " ",{
        httpOnly:true,
        expires:new Date(0)
    }).send();
})
router.get("/loggedIn",(req,res)=>{
    try{
        const token=req.cookies.token;
        if(!token) return res.json(false);

       jwt.verify(token, process.env.JWT_SECRET);
        res.send(true);
        
    }catch(err){
        
        res.json(false)
    }
});

module.exports=router;