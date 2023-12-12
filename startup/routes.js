import express from 'express';
import home from '../routes/home.router.js';
import genres from '../routes/genre.router.js';
import cusomers from '../routes/customer.router.js';
import movies from '../routes/movie.router.js';
import rentals from '../routes/rental.router.js';
import users from '../routes/user.router.js';
import auth from '../routes/auth.router.js';
import returns from '../routes/return.router.js';
import {error} from '../middleware/error.js';


export const routes = (app)=>{
    app.use(express.json());
    app.use('/',home);
    app.use('/api/genre',genres);
    app.use('/api/customer',cusomers);
    app.use('/api/movie',movies);
    app.use('/api/rental',rentals);
    app.use('/api/user',users);
    app.use('/api/auth',auth);
    app.use('/api/returns',returns);
    app.use('*',(req,res)=>{res.status(404).json('Page not found');});
    app.use(error);
}