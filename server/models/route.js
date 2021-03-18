// Schema for handling/receiving route list data into our mongo database
const mongoose = require('mongoose');

const Schema= mongoose.Schema;

const routeSchema=new Schema({
    
    name:{
        type:String,
        required:true
    },
    day: {
        type: Number,
        required: true
    },
    departureHour:{
        type:Number,
        required:true,
        default:Date.now
    },
    departureMinute:{
        type:Number,
        required:true,default:Date.now
    },
    arrivalHour:{
        type:Number,
        required:true,default:Date.now
    },
    arrivalMinute:{
        type:Number,
        required:true,default:Date.now
    },
    fare:{
        type:Number,
        required:true
    },
    status: {
        type: String,
        required: true,
        default: "On Time"
    }

},{timestamps:true});

const Route= mongoose.model('Route', routeSchema)

module.exports=Route;