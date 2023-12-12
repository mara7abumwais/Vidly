import { Customer } from "../models/customer.model.js";
import { Movie } from "../models/movie.model.js";
import { Rental } from "../models/rental.model.js";

export const getAllRentals = async(req,res)=>{
    const rentals = await Rental.find();
    res.status(200).json({success:true,rentals});
};

export const getRental = async(req,res)=>{
    const {id} = req.params;
    const rental = await Rental.findById(id);
    if(rental)
        return res.status(404).json({success:false,message:'Invalid ID.'});
    res.status(200).json({success:true,rental});
};

export const addRental = async(req,res)=>{
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).json({success:false,message:'Invaid customer.'});

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).json({success:false,message:'Invaid movie.'});

    if(movie.numberInStock === 0) return res.status(400).json({success:false,message:'Movie not in stock.'});
    let rental = new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            isGold:customer.isGold,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        },
    });
    rental = await rental.save();
    movie.numberInStock--;
    movie.save();
    res.status(200).json({success:true,rental});
};

export const  updateRental = async(req,res)=>{
    const {id} = req.params;
    const rental = await Rental.findByIdAndUpdate({_id:id},req.body,{new:true});
    if(!rental)
        return res.status(404).json({success:false,message:'Invalid ID.'});
    res.status(200).json({success:true,rental});
};

export const deleteRental = async(req,res)=>{
    const {id} = req.params;
    const rental = await Rental.findByIdAndDelete({_id:id});
    if(!rental)
        return res.status(404).json({success:false,message:'Invalid ID.'});
    res.status(200).json({success:true,rental});
};

