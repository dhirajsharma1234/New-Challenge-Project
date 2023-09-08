import validator from "validator";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:[30,"Name cannot exceed 30 characters."],
        minLength:[4,"Name should have more than 4 characters."]
    },
    email:{
        type:String,
        required:[true,"Please enter your email."],
        validate:[validator.isEmail,"Please Enter a valid Email"],
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8,
        select:false
    },
   
},
{
    timestamps:true
});

const User = new mongoose.model("User",userSchema);

export default User;