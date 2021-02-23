// API controller (app.get, app.post)
const { Router, response } = require('express');
const express=require('express');
const router=express.Router()
const Route= require('../models/route')
const {DateTime} = require('luxon');
const ExceptionRoutes = require('../models/exceptionRoutes');
const Notifications = require('../models/notifications')

const TIMEZONE = 'UTC-7';
//console.log((DateTime.local().setZone(TIMEZONE)).isValid);

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
// GET BY DAY
router.get('/day/:day', getRoutes, (req,res)=>{
    res.json(res.route);
});
//GET BY STATION
// router.get('/station/:id',getRoute,(req,res)=>{
//     res.json(res.route)
// })
//CREATE post request
router.post('/', async(req,res)=>{
    const route= new Route({
        name:req.body.name,
        day: req.body.day,
        departureHour:req.body.departureHour,
        departureMinute:req.body.departureMinute,
        arrivalHour:req.body.arrivalHour,
        arrivalMinute:req.body.arrivalMinute,
        fare:req.body.fare,
        status:req.body.status
    })
    try{
        const newRoute= await route.save()
        res.status(201).json(newRoute)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})
//UPDATE request
router.patch('/:id', getRoute, async(req,res)=>{
    if(req.body.name !==null){
        res.route.name=req.body.name
    }
    if(req.body.station !==null){
        res.route.station=req.body.station
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
    }if(req.body.status !=null) {
        res.route.status=req.body.status
    }
    try{
        const updateRoute=await res.route.save()
        res.json(updateRoute)
    }catch(err){
        res.status(400).json({message : err.message})
    }
    const notification= new Notifications({
        title:`Route ${res.route.name} has been updated`,
        urgency: 'info',
        message:'Check schedule'
    }) 
    try {
        await notification.save()
    }catch(err){
        console.log(err)
    }

})
//DELETE request
router.delete('/:id',getRoute, async(req,res)=>{
    try{
        await res.route.remove()
        await ExceptionRoutes.deleteMany({routeId:req.params.id})
        res.json({message:"Deleted Route"})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

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

async function getExceptions(req, res, next) {
    try {
        let exception = await ExceptionRoutes.find(req.params.day);
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    res.route=exception;
    next();
}
// This function get a list of routes based on numerical day
async function getRoutes(req, res, next) {
    let routes;
    let exceptions;
    try {
        // Get routes based on numerical day
        routes = await Route.find({day: req.params.day});
        exceptions = await ExceptionRoutes.find({day: req.params.day});
    } catch(err) {
        return res.status(500).json({message: err.message});
    }
    if (exceptions.length > 0) {
        //routes = exceptions;
        routes = routes.map((route) => exceptions.find((exception) => exception.routeId == route._id.toString()) || route);
    }
    // Get current server time
    let time = DateTime.local().setZone(TIMEZONE);
    // Perform all the filtering, sorting, and mapping to pass the relavent information
    routes = routes.filter(route => (
        DateTime.fromObject({zone: TIMEZONE, hour: route.departureHour, minute: route.departureMinute}) > DateTime.local().setZone(TIMEZONE))).sort((a, b) => a.departureHour-b.departureHour || a.departureMinute-b.departureMinute).filter((route, index, self) => index === self.findIndex((t) => (t.name === route.name))).map((route) => ({_id: route._id, name: route.name, day: route.day, departure: DateTime.fromObject({zone: TIMEZONE, hour: route.departureHour, minute: route.departureMinute}), arrival: DateTime.fromObject({zone: TIMEZONE, hour: route.arrivalHour, minute: route.arrivalMinute}), fare: route.fare, status: route.status}));
    res.route=routes;
    next();
}

module.exports=router