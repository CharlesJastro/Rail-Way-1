// Schema for handling/receiving notifications in our mongo database

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