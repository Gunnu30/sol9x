const mongoose = require("mongoose");
const Students = new mongoose.Schema({
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
        default:'student', 
        enum:['student']
    },
    course:{
        type:String,
        default:'Not enrolled'
    },
    dob:{
        type:Date,
    },
    age:{
        type:Number,
    },
    hobies:{
        type:[String],
        default:[]
    },
    gender:{
        type:String,
        enum:['Male', 'Female', 'Other']
    },
})
module.exports = mongoose.model("Students",Students);