import {model,Schema} from 'mongoose';
import Joi from 'joi';

export const Customer = model('Customer',new Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:15,
        trim:true,
        required:true
    },
    phone:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10,
        required:true
    },
    isGold:{
        type:Boolean,
        default:false
    }
}));

export const validateCustomer = (customer)=>
{
    const schema = Joi.object({
        name:Joi.string().min(3).max(15).required(),
        isGold:Joi.boolean(),
        phone:Joi.string().min(10).max(10).required()
    });
    return schema.validate(customer);
};