const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
});

const UserModel = mongoose.model("user",UserSchema);
module.exports=UserModel;