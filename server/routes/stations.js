//Handle station request
const express=require('express');
const stations = require('../models/stations');
const router=express.Router()
const Stations=require('../models/stations')
//Getting All
router.get('/', async(req,res)=>{
    try{
        const stations=await Stations.find()
        res.send(stations)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})
// Get list of stations
router.get('/list', getList, (req,res)=> {
    res.json(res.stations)
});
//GET BY DAY WITH ID
router.get('/day/:id', getStations, (req,res)=>{
    res.json(res.stations);
});
//Getting by ID
router.get('/:id',getStations,(req,res)=>{
    res.json(res.stations)
})
//CREATING post request for station
router.post('/', async(req,res)=>{
    const stations=new Stations({
        name: req.body.name,
        day:req.body.day,
        startingStation:req.body.startingStation,
        endingStation:req.body.endingStation,
        departureHour:req.body.departureHour,
        departureMinute:req.body.departureMinute,
        arrivalHour:req.body.arrivalHour,
        arrivalMinute:req.body.arrivalMinute,
        fare:req.body.fare,
        code:req.body.code
    })
    try{
        const newStations= await stations.save()
        res.status(201).json(newStations)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
})
//UPDATE STATION
router.patch('/:id',getStations, async(req,res)=>{
    if(req.body.name != null){
        res.stations.name=req.body.name
    }
    if(req.body.day != null){
        res.stations.day=req.body.day
    }
    if(req.body.startingStation != null){
        res.stations.startingStation=req.body.startingStation
    }
    if(req.body.endingStation != null){
        res.stations.endingStation=req.body.endingStation
    }
    if(req.body.departureHour != null){
        res.stations.departureHour=req.body.departureHour
    }
    if(req.body.departureMinute != null){
        res.stations.departureMinute=req.body.departureMinute
    }
    if(req.body.arrivalHour != null){
        res.stations.arrivalHour=req.body.arrivalHour
    }
    if(req.body.arrivalMinute != null){
        res.stations.arrivalMinute=req.body.arrivalMinute
    }
    if(req.body.fare != null){
        res.stations.fare=req.body.fare
    }
    if(req.body.code != null) {
        res.stations.code=req.body.code
    }
    try{
        const updatedStations= await res.stations.save()
        res.json(updatedStations)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
    
})
//DELETE STATION
router.delete('/:id',getStations, async(req,res)=>{
    try{
        await res.stations.remove()
        res.json({message:"Deleted Stations"})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})
//MIDDLEWARE STATION ROUTE
async function getStations(req,res,next){
    let stations
    try{
        stations=await Stations.findById(req.params.id)
        if(stations==null){
            return res.status(404).json({message:'Cannot find station'})
        }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
    res.stations=stations
    next()
}

async function getList(req,res,next){
    let stations
    let stationList
    let stationList2
    try{
        stations=await Stations.find()
        stationList = stations.map((item, index) => item.startingStation);
        stationList2 = stations.map((item, index) => item.endingStation);
        stationList = stationList.concat(stationList2);
        stationList = stationList.filter((value, index, self) => (
            self.indexOf(value) === index
        ));
    }catch(err){
        res.status(500).json({message: err.message})
    }
    res.stations=stationList
    next()
}

module.exports=router