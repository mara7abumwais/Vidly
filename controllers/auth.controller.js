import { User} from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import Joi from 'joi';

export const login = async(req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).json({success:false,message:error.details[0].message});
    
    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).json({success:false,message:"Invalid email or password"});
    
    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).json({success:false,message:"Invalid email or password"});
    
    const token = user.generateAuthToken();
    res.header('x-auth-token',token).status(200).json({success:true,token});
};

const validate =  (user)=>
{
    const schema = Joi.object({
        email:Joi.string().min(8).max(255).required().email(),
        password:Joi.string().min(8).max(255).required()
    });
    return schema.validate(user);
};