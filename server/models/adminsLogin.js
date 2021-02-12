const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const adminsLoginSchema=new Schema({
    fullName:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
})

const AdminsLogin=mongoose.model('AdminsLogin', adminsLoginSchema)

module.exports=AdminsLogin;