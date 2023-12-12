import { User} from '../models/user.model.js';
import _ from 'lodash'; 
import bcrypt from 'bcryptjs';


export const getAllUsers = async(req,res)=>{
    const users = await User.find();
    res.status(200).json({success:true,users});
};

export const getUser = async(req,res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json({success:true,user});
};

export const addUser = async(req,res)=>{
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).json({success:false,message:"User already registerd!"});
    user = new User(_.pick(req.body,['name','email','password','isAdmin']));
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token',token).status(200).json({success:true,message:_.pick(user,['_id','name','email'])});
};

