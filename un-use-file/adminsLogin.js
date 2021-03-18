/*
//Handle station request
const express=require('express');
const adminsLogin = require('../models/adminsLogin');
const router=express.Router()
const AdminsLogin=require('../models/adminsLogin');
const bcrypt=require('bcrypt')
//Getting All
router.get('/', async(req,res)=>{
    try{
        const adminsLogin=await AdminsLogin.find()
        res.send(adminsLogin)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
//GET BY DAY WITH ID
router.get('/day/:id', getAdminsLogin, (req,res)=>{
    res.json(res.adminsLogin);
});
//Getting by ID
router.get('/:id',getAdminsLogin,(req,res)=>{
    res.json(res.stations)
})
//CREATING post request for station
router.post('/', async(req,res)=>{
    const saltPassword=await bcrypt.genSalt(10)
    const securePassword=await bcrypt.hash(req.body.password, saltPassword)
    const secureConfirmPassword=await bcrypt.hash(req.body.confirmPassword, saltPassword)
    const adminsLogin=new AdminsLogin({
        fullName: req.body.fullName,
        userName:req.body.userName,
        email:req.body.email,
        password:securePassword,
        confirmPassword:secureConfirmPassword,
        
    })
    try{
        const newAdminsLogin= await adminsLogin.save()
        res.status(201).json(newAdminsLogin)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})
//UPDATE STATION
router.patch('/:id',getAdminsLogin, async(req,res)=>{
    if(req.body.fullName != null){
        res.adminsLogin.fullName=req.body.fullName
    }
    if(req.body.userName != null){
        res.adminsLogin.userName=req.body.userName
    }
    if(req.body.email != null){
        res.adminsLogin.email=req.body.email
    }
    if(req.body.password != null){
        res.adminsLogin.password=req.body.password
    }
    if(req.body.confirmPassword != null){
        res.adminsLogin.confirmPassword=req.body.confirmPassword
    }
    
    try{
        const updatedAdminsLogin= await res.stations.save()
        res.json(updatedAdminsLogin)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
    
})
//DELETE STATION
router.delete('/:id',getAdminsLogin, async(req,res)=>{
    try{
        await res.adminsLogin.remove()
        res.json({message:"Deleted Admins"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})
//MIDDLEWARE STATION ROUTE
async function getAdminsLogin(req,res,next){
    let adminsLogin
    try{
        adminsLogin=await AdminsLogin.findById(req.params.id)
        if(adminsLogin==null){
            return res.status(404).json({message:'Cannot find admins'})
        }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
    res.adminsLogin=adminsLogin
    next()
}

module.exports=router
*/