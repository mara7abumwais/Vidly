import { Genre } from '../models/genre.model.js';
import { Movie, validateMovie } from '../models/movie.model.js';


export const getAllMovies = async(req,res)=>{
    const movies = await Movie.find();
    res.status(200).json({success:true,movies});
};

export const getMovie = async(req,res)=>{
    const {id} = req.params;
    const movie = await Movie.findById(id);
    if(!movie)
        return res.status(404).json({success:false,message:'Invalid ID.'});
    res.status(200).json({success:true,movie});
};

export const addMovie = async(req,res)=>{ 
    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).json({success:false,message:'Invalid genre'});
    
    const movie = new Movie({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });
    await movie.save();
    res.status(200).json({success:true,movie});
};

export const  updateMovie = async(req,res)=>{
    const {id} = req.params;
    const movie = await Movie.findByIdAndUpdate({_id:id},req.body,{new:true});
    if(!movie)
        return res.status(404).json({success:false,message:'Invalid ID.'});
    res.status(200).json({success:true,movie});
};

export const deleteMovie = async(req,res)=>{
    const {id} = req.params;
    const movie = await Movie.findByIdAndDelete({_id:id});
    if(!movie)
        return res.status(404).json({success:false,message:'Invalid ID.'});
    res.status(200).json({success:true,movie});
};

