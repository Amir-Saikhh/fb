import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
 username:{
    type:String,
    required:true,
    minlenth:3,
    maxlenght:20
 },
 email:{
    type:String,
    required:true,
    unique:true

 },
 password:{
    type:String,
    required:true,
    minlenght:8,
    maxlenght:500
 },
 forgetPasswordOtp:{
   type:String,
   default:""
 },
   forgetPasswordOtpExpire:{
      type:Number,
      default:0
   },

},{timestamps:true});

export const userModel = mongoose.model('userModel',userSchema)

