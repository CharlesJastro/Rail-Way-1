const { Router } = require('express');
const express=require('express');
const router=express.Router()
const Route= require('../models/route')
//GET-ALL
router.get('/', async(req,res)=>{
    try{
        const route= await Route.find()
        res.json(route)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
//GET-ONE
router.get('/:id', getRoute,(req,res)=>{
    res.json(res.route)
})
//CREATE
router.post('/', async(req,res)=>{
    const route= new Route({
        name:req.body.name,
        day: req.body.day,
        departureHour:req.body.departureHour,
        departureMinute:req.body.departureMinute,
        arrivalHour:req.body.arrivalHour,
        arrivalMinute:req.body.arrivalMinute,
        fare:req.body.fare
    })
    try{
        const newRoute= await route.save()
        res.status(201).json(newRoute)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})
//UPDATE
router.patch('/:id', getRoute, async(req,res)=>{
    if(req.body.name !==null){
        res.route.name=req.body.name
    }
    if(req.body.departureHour !=null){
        res.route.departureHour=req.body.departureHour
    }
    if(req.body.day!=null){
        res.route.day=req.body.day
    }
    if(req.body.departureMinute !=null){
        res.route.departureMinute=req.body.departureMinute
    }
    if(req.body.arrivalHour !=null){
        res.route.arrivalHour=req.body.arrivalHour
    }if(req.body.arrivalMinute !=null){
        res.route.arrivalMinute=req.body.arrivalMinute
    }if(req.body.fare !=null){
        res.route.fare=req.body.fare
    }try{
        const updateRoute=await res.route.save()
        res.json(updateRoute)
    }catch(err){
        res.status(400).json({message : err.message})
    }
})
//DELETE
router.delete('/:id',getRoute, async(req,res)=>{
    try{
        await res.route.remove()
        res.json({message:"Deleted Route"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
//MIDDLEWARE ROUTE
async function getRoute(req,res,next){
    let route
    try{
        route=await Route.findById(req.params.id)
        if(route==null){
            return res.status(404).json({message: 'Cannot find Routes'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.route=route
    next()
}

module.exports=router