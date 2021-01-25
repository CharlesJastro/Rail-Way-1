//SCHEMA FOR STATION
const mongoose=require('mongoose')

const stationsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    day:{
        type:String,
        required:true
    },
    startingStation:{
        type:String,
        required:true
    },
    endingStation:{
        type:String,
        required:true
    },
    departureHour:{
        type:Number,
        required:true,
        default:Date.now
    },
    departureMinute:{
        type:Number,
        required:true,
        default:Date.now
    },
    arrivalHour:{
        type:Number,
        required:true,
        default:Date.now
    },
    arrivalMinute:{
        type:Number,
        required:true,
        default:Date.now
    },
    fare:{
        type:Number,
        required:true
    }
})
module.exports=mongoose.model("Stations",stationsSchema)