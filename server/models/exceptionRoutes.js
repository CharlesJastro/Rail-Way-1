// Schema for handling/receiving data into our mongo database
const mongoose = require('mongoose');

const Schema= mongoose.Schema;

const exceptionSchema=new Schema({
    
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
        default: "Disruption"
    },
    id:{
        type:String,
        required:true
    }

},{timestamps:true});

const ExceptionRoutes= mongoose.model('Exceptions', exceptionSchema)

module.exports=ExceptionRoutes;