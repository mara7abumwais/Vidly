import Joi from "joi";
import { Schema,model } from "mongoose";
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:15,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        match:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password:{
        type:String,
        minlength:8,
        maxlength:1024,
        match: /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
        trim:true,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

userSchema.methods.generateAuthToken = function()
{
    const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin},process.env.vidly_jwtPrivateKey,{ expiresIn: '1h' });
    return token;
}; 

export const User = model('user',userSchema);

export const validateUser =  (user)=>
{
    const schema = Joi.object({
        name:Joi.string().min(3).max(15).required(),
        email:Joi.string().min(8).max(255).required().email(),
        password:Joi.string().min(8).max(255).required(),
        isAdmin:Joi.boolean()
    });
    return schema.validate(user);
};