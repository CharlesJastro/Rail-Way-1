// This files handles all exceptions requests
let router = require('express').Router();
const Exceptions= require('../models/exceptionRoutes');

// Get all exceptions
router.get('/', async(req, res) => {
    try {
        const exceptions = await Exceptions.find();
        res.json(exceptions);
    } catch(err) {
        res.status(500).json({message:err.message});
    }
});
// Get by ID
router.get('/:id', getException,(req,res)=>{
    res.json(res.exception);
});
// Create post request
router.post('/', async(req, res) => {
    const exception = new Exceptions({
        name: req.body.name,
        day: req.body.day,
        departureHour: req.body.departureHour,
        departureMinute: req.body.departureMinute,
        arrivalHour: req.body.arrivalHour,
        arrivalMinute: req.body.arrivalMinute,
        fare: req.body.fare,
        id: req.body.id,
        status: req.body.status
    });
    try {
        const newExceptions = await exception.save();
        res.status(201).json(newExceptions);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});
// Update exception
router.patch('/:id', getException, async(req,res)=>{
    if(req.body.name !=null){
        res.exception.name=req.body.name;
    }
    if(req.body.day !=null){
        res.exception.day=req.body.day;
    }
    if(req.body.departureHour !=null){
        res.exception.departureHour=req.body.departureHour;
    }
    if(req.body.departureMinute !=null){
        res.exception.departureMinute=req.body.departureMinute;
    }
    if(req.body.arrivalHour !=null){
        res.exception.arrivalHour=req.body.arrivalHour;
    }
    if(req.body.arrivalMinute !=null){
        res.exception.arrivalMinute=req.body.arrivalMinute;
    }
    if(req.body.fare !=null){
        res.exception.fare=req.body.fare;
    }
    if(req.body.id !=null) {
        res.exception.id=req.body.id;
    }
    if(req.body.status !=null) {
        res.exception.status=req.body.status;
    }
    try{
        const updateException=await res.exception.save();
        res.json(updateException);
    }catch(err){
        res.status(400).json({message : err.message});
    }
});
// Delete exception
router.delete('/:id', getException, async(req, res) => {
    try {
        await res.exception.remove();
        res.json({message: "Deleted Exception"});
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});
// Middleware function to get a specific notification based on id
async function getException(req,res,next){
    let exception
    try{
        exception=await Exceptions.findById(req.params.id)
        if(exception==null){
            return res.status(404).json({message: 'Cannot find exception'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.exception = exception;
    next();
}

module.exports = router;