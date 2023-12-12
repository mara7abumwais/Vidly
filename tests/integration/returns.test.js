import { Types } from 'mongoose';
import { Rental } from '../../models/rental.model.js';
import request from 'supertest';
import {User} from '../../models/user.model.js';
import moment from 'moment';
import { Movie } from '../../models/movie.model.js';
import {server} from '../../app.js';

describe('GET / ',()=>{
    let customerId;
    let movieId;
    let rental;
    let token;
    let movie;

    afterEach(async()=>{
        server.close();
        await Rental.deleteMany({});
        await Movie.deleteMany({});
    });

    const exec = ()=>{
        return request(server)
        .post('/api/returns')
        .set('x-auth-token',token)
        .send({customerId,movieId});
    };

    beforeEach(async()=>{
        customerId =new Types.ObjectId();
        movieId =new Types.ObjectId();
        token = new User().generateAuthToken();

        movie = new Movie({
            _id:movieId,
            title:'moviex',
            dailyRentalRate:2,
            genre:{name:'Action'},
            numberInStock:10
        });
        await movie.save();

        rental = new Rental({
            customer:{
                _id:customerId,
                name:'Marah',
                phone:'0599474747'
            },
            movie:{
                _id:movieId,
                title:'moviex',
                dailyRentalRate:2
            },
        });
        await rental.save();
    });

    it('should return 401 if client is not logged in',async()=>{
        token = '';
        const res = await exec();
        expect(res.status).toBe(401);
    });

    it('should return 400 if customer id is not provided',async()=>{
        customerId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 400 if movie id is not provided',async()=>{
        movieId = '';
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 404 if no rental found for this cutomer/movie',async()=>{
        await Rental.deleteMany({});
        const res = await exec();
        expect(res.status).toBe(404);
    });

    it('should return 400 if return is already processed',async()=>{
        rental.dateReturned = new Date();
        await rental.save();
        const res = await exec();
        expect(res.status).toBe(400);
    });

    it('should return 200 if we have a valid request',async()=>{
        const res = await exec();
        expect(res.status).toBe(200);
    });

    it('should set the returnDate if input is valid',async()=>{
        await exec();
        const rentalInDB = await Rental.findById(rental._id);
        const diff = new Date() - rentalInDB.dateReturned;
        expect(diff).toBeLessThan(10*1000);
    });

    it('should set the rentalFee if input is valid',async()=>{
        rental.dateOut = moment().add(-7,'days').toDate();
        await rental.save();
        await exec();
        const rentalInDB = await Rental.findById(rental._id);
        expect(rentalInDB.rentalFee).toBe(14);
    });

    it('should increase the movie stock if input is valid',async()=>{
        await exec();
        const movieInDB = await Movie.findById(movieId);
        expect(movieInDB.numberInStock).toBe(movie.numberInStock +1);
    });

    it('should return the rental if input is valid',async()=>{
        const res = await exec();
        const rentalInDB = await Rental.findById(rental._id);
        expect(Object.keys(res.body)).toEqual(
            expect.arrayContaining(['dateOut','dateReturned','rentalFee',
            'customer','movie'])
        );
    });
});
