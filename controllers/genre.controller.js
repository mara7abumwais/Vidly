import { Genre} from '../models/genre.model.js';
import _ from 'lodash'; 

export const getAllGenres = async(req,res)=>{
    const genres = await Genre.find();
    res.status(200).json({success:true,genres});
};

export const getGenre = async(req,res)=>{
    const {id} = req.params;
    const genre = await Genre.findById(id);
    if(!genre)
        return res.status(404).json({success:false,message:'Invalid ID.'});
    res.status(200).json({success:true,genre});
    };

export const addGenre = async(req,res)=>{
    const genre = new Genre(_.pick(req.body,'name'));
    await genre.save();
    res.status(200).json({success:true,genre});
};

export const  updateGenre = async(req,res)=>{
    const {id} = req.params;
    const genre = await Genre.findByIdAndUpdate({_id:id},req.body,{new:true});
    if(!genre)
        return res.status(404).json({success:false,message:'Invalid ID.'});
    res.status(200).json({success:true,genre});
};

export const deleteGenre = async(req,res)=>{
    const {id} = req.params;
    const genre = await Genre.findByIdAndDelete({_id:id});
    if(!genre)
        return res.status(404).json({success:false,message:'Invalid ID.'});
    res.status(200).json({success:true,id});
};

