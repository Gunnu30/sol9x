const mongoose = require("mongoose");

const Admins = new mongoose.Schema({
    name :{
        type : String,  
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    role:{
        type:String,
        required:true,
        default:'admin',
        enum:['admin']
    },
    dob:{
        type:Date,
    },
    gender:{
        type:String,
        enum:['male', 'female', 'other']
    },
})

module.exports = mongoose.model("Admins",Admins);