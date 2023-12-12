import {model,Schema} from 'mongoose';
import moment from "moment";
import Joi from 'joi';

const rentalSchema = new Schema({
    customer:{
        type:new Schema({
            name:{
                type:String,
                minlength:3,
                maxlength:15,
                trim:true,
                required:true
            },
            isGold:{
                type:Boolean,
                default:false
            },
            phone:{
                type:String,
                required:true,
                minlength:10,
                maxlength:10,
                required:true
            }
        }),
        required:true
    },
    movie:{
        type:new Schema({
            title:{
                type:String,
                required:true,
                minlength:5,
                maxlength:255,
                trim:true
            },
            dailyRentalRate:{
                type:Number,
                required:true,
                min:0,
                max:255
            },
        }),
        required:true
    },
    dateOut:{
        type:Date,
        required:true,
        default:Date.now
    },
    dateReturned:{
        type:Date
    },
    rentalFee:{
        type:Number,
        min:0
    }
});

rentalSchema.statics.lookup = function(customerId,movieId)
{
    return this.findOne({
        'customer._id':customerId,
        'movie._id':movieId,
    });
};

rentalSchema.methods.return = function()
{
    this.dateReturned = new Date();

    const rentalDays = moment().diff(this.dateOut,'days')
    this.rentalFee = rentalDays * this.movie.dailyRentalRate;
};

export const Rental = model('Rental',rentalSchema);

export const validateRental = (rental)=>
{
    const schema = Joi.object({
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required(),
    });
    return schema.validate(rental);
};