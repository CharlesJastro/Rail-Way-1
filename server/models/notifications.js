// Schema for handling/receiving data into our mongo database
// Schema for notifications
const mongoose = require('mongoose');

const Schema= mongoose.Schema;

const notifSchema=new Schema({
    
    title:{
        type: String,
        required: true
    },
    urgency: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }

},{timestamps:true});

const Notifications= mongoose.model('Notifications', notifSchema)

module.exports=Notifications;