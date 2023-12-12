import {Schema,model} from "mongoose";
import Joi from 'joi';

export const genreSchema = new Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:20,
        lowercase:true,
        trim:true,
        required:true,
        unique:true
    }
});

export const Genre = model('Genre',genreSchema);

export const validateGenre = (genre)=>
{
    const schema = Joi.object(
        {name:Joi.string().min(3).max(20).required()}
    );
    return schema.validate(genre);
};


