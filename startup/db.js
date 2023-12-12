import mongoose from 'mongoose';
import {logging} from './logging.js'; 

export const connectDB = ()=>{
    let db;
    if(process.env.NODE_ENV === 'testing')
        db = process.env.DB_URI_TEST;
    else
        db = process.env.DB_URI;
    const logger = logging(); 
    mongoose.connect(db)
    .then(() => logger.info(`Connected to ${db}...`))
}

