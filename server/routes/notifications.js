// This files handles all notification requests
let router = require('express').Router();
const Notifications= require('../models/notifications');

// Get all notifications
router.get('/', async(req, res) => {
    try {
        const notifications = await Notifications.find();
        res.json(notifications);
    } catch(err) {
        res.status(500).json({message:err.message});
    }
});
// Get by ID
router.get('/:id', getNotif,(req,res)=>{
    res.json(res.notification);
});
// Create new notification
router.post('/', async(req, res) => {
    const notification = new Notifications({
        title: req.body.title,
        urgency: req.body.urgency,
        message: req.body.message
    });
    try {
        const newNotif = await notification.save();
        res.status(201).json(newNotif);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});
// Update notification
router.patch('/:id', getNotif, async(req,res)=>{
    if(req.body.title !=null){
        res.notification.title=req.body.title;
    }
    if(req.body.urgency !=null){
        res.notification.urgency=req.body.urgency;
    }
    if(req.body.message !=null){
        res.notification.message=req.body.message;
    }try{
        const updateNotif=await res.notification.save();
        res.json(updateNotif);
    }catch(err){
        res.status(400).json({message : err.message});
    }
});
// Delete notification
router.delete('/:id', getNotif, async(req, res) => {
    try {
        await res.notification.remove();
        res.json({message: "Deleted Notification"});
    } catch(err) {
        res.status(400).json({message: err.message});
    }
});
// Middleware function to get a specific notification based on id
async function getNotif(req,res,next){
    let notification
    try{
        notification=await Notifications.findById(req.params.id)
        if(notification==null){
            return res.status(404).json({message: 'Cannot find notification'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
    res.notification = notification;
    next();
}

module.exports = router;