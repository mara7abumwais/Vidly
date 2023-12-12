import { Rental } from "../models/rental.model.js";
import { Movie } from "../models/movie.model.js";

export const addReturn = async(req,res)=>{    
    const rental = await Rental.lookup(req.body.customerId,req.body.movieId);

    if(!rental) return res.status(404).send({success:false,message:'Rental not found.'});
    
    if(rental.dateReturned) return res.status(400).send({success:false,message:'Return already processed.'});
    
    rental.return();
    await rental.save();

    await Movie.updateOne({_id:rental.movie._id},{
        $inc:{numberInStock:1}
    });
    return res.status(200).send({success:true,rental});
};
