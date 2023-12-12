import { Customer , validateCustomer} from '../models/customer.model.js';

export const getAllCustomers = async(req,res)=>{
    const customers = await Customer.find();
    res.status(200).json({success:true,customers});
};

export const getCustomer = async(req,res)=>{
    const {id} = req.params;
    const customer = await Customer.findById(id);
    if(!customer)
        return res.status(404).json({success:false,message:'Invalid ID.'});
    res.status(200).json({success:true,customer});
};

export const addCustomer = async(req,res)=>{
    const customer = new Customer(req.body);
    await customer.save();
    res.status(200).json({success:true,customer});
};

export const  updateCustomer = async(req,res)=>{
    const {id} = req.params;
    const customer = await Customer.findByIdAndUpdate({_id:id},req.body,{new:true});
    if(!customer)
        return res.status(404).json({success:false,message:'Invalid ID.'});
    res.status(200).json({success:true,customer});
};

export const deleteCustomer = async(req,res)=>{
    const {id} = req.params;
    const customer = await Customer.findByIdAndDelete({_id:id});
    if(!customer)
        return res.status(404).json({success:false,message:'Invalid ID.'});
    res.status(200).json({success:true,customer});
};

