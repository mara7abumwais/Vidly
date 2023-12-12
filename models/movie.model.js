import { Schema,model } from "mongoose";
import { genreSchema } from "./genre.model.js";
import Joi from 'joi';

export const Movie = model('Movie',new Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        trim:true
    },
    genre:{
        type:genreSchema,
        required:true
    },
    numberInStock:{
        type:Number,
        required:true,
        min:0,
        max:255
    },
    dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:255
    }
}));

export const validateMovie = (movie)=>
{
    const schema = Joi.object({
        title:Joi.string().min(5).max(255).required(),
        genreId:Joi.objectId().required(),
        numberInStock:Joi.number().min(0).max(255).required(),
        dailyRentalRate:Joi.number().min(0).max(255).required()
        }
    );
    return schema.validate(movie);
};

