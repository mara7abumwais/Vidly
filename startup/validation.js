import Joi from 'joi';
import JoiObjectId from "joi-objectid";

export const validation = ()=>{
    Joi.objectId = JoiObjectId(Joi);
};