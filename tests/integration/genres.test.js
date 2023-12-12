import {server} from '../../app.js';
import request from 'supertest';
import {Genre} from '../../models/genre.model.js';
import {User} from '../../models/user.model.js';
import { Types } from 'mongoose';

describe('/api/genre',()=>{
    afterEach(async()=>{
        server.close();
        await Genre.deleteMany({});
    });

    describe('GET / ',()=>{
        it('should retuen all genres',async()=>{
            await Genre.collection.insertMany([
                {name:'genre1'},
                {name:'genre2'},
            ]);

            const res = await request(server).get('/api/genre')
            expect(res.status).toBe(200);
            expect(res.body.success).toBeTruthy();
            expect(res.body.genres.length).toBe(2);
            expect(res.body.genres.some((g) => g.name === 'genre1')).toBeTruthy();
        });
    });

    describe('GET /:id',()=>{
        it('should return a genre if a valid id is passed',async()=>{
            const genre = new Genre({name:'genre1'});
            await genre.save();

            const res = await request(server).get('/api/genre/'+genre._id);
            expect(res.status).toBe(200);
            expect(res.body.success).toBeTruthy();
            expect(res.body.genre).toHaveProperty('name',genre.name);
        });

        it('should return 404 if invalid id is passed',async()=>{
            const res = await request(server).get('/api/genre/1');
            expect(res.status).toBe(404);
            expect(res.body.success).not.toBeTruthy();
        });

        it('should return 404 if no genre with given id exsits',async()=>{
            const id = new Types.ObjectId();
            const res = await request(server).get('/api/genre/'+id);
            expect(res.status).toBe(404);
            expect(res.body.success).not.toBeTruthy();
        });
    });

    describe('POST /',()=>{
        let token;
        let name ;
        let isAdmin;
        let user;

        const exec = ()=>{
            return request(server)
                .post('/api/genre/')
                .set('x-auth-token',token)
                .send({name});
        };
        beforeEach(()=>{
            isAdmin = true;
            user = {_id: new Types.ObjectId().toHexString(), isAdmin};
            token = new User(user).generateAuthToken();
            name ='genre1';
        });

        it('should return 401 if client is not logged in',async()=>{
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 403 if client is not admin',async()=>{
            user.isAdmin = false;
            token = new User(user).generateAuthToken();
            const res = await exec();
            expect(res.status).toBe(403);
        });

        it('should return 400 if genre is less than 5 characters',async()=>{
            name = 'ge';
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 400 if genre is more than 20 characters',async()=>{
            name = new Array(22).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should save the genre if its valid',async()=>{
            const res = await exec();
            expect(res.status).toBe(200);
            const genre = await Genre.find({name:'genre1'});
            expect(genre).not.toBeNull();
        });

        it('should return the genre if its valid',async()=>{
            const res = await exec();
            expect(res.body.success).toBeTruthy();
            expect(res.body.genre).toHaveProperty('_id');
            expect(res.body.genre).toHaveProperty('name','genre1');
        });
    });

    describe('PUT /',()=>{
        let token;
        let id;
        let genre;
        let newName;
        let isAdmin;
        let user;

        const exec = ()=>{
            return request(server)
                .put('/api/genre/'+id)
                .set('x-auth-token',token)
                .send({name:newName});
        };
        beforeEach(async()=>{
            genre = new Genre({ name: 'genre1' });
            await genre.save();
            isAdmin = true;
            id = genre._id;
            user = {_id: new Types.ObjectId().toHexString(), isAdmin};
            token = new User(user).generateAuthToken();
            newName = 'genre2';
        });

        it('should return 401 if client is not logged in',async()=>{
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 403 if client is not admin',async()=>{
            user.isAdmin = false;
            token = new User(user).generateAuthToken();
            const res = await exec();
            expect(res.status).toBe(403);
        });

        it('should return 404 if invalid id is passed',async()=>{
            id = 1;
            const res = await exec();
            expect(res.status).toBe(404);
        });

        it('should return 404 if no genre with given id exsits',async()=>{
            id = new Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);
        });

        it('should return 400 if genre is less than 5 characters',async()=>{
            newName = 'ge';
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should return 400 if genre is more than 20 characters',async()=>{
            newName = new Array(22).join('a');
            const res = await exec();
            expect(res.status).toBe(400);
        });

        it('should save the genre if its valid',async()=>{
            const res = await exec();
            expect(res.status).toBe(200);
            const genre = await Genre.findOne({name:newName});
            expect(genre.name).toBe(newName);
        });

        it('should return the genre if its valid',async()=>{
            const res = await exec();
            expect(res.body.success).toBeTruthy();
            expect(res.body.genre).toHaveProperty('_id');
            expect(res.body.genre).toHaveProperty('name',newName);
        });
    });

    describe('DELETE /',()=>{
        let token;
        let id;
        let genre;
        let isAdmin;
        let user;

        const exec = ()=>{
            return request(server)
                .delete('/api/genre/'+id)
                .set('x-auth-token',token);
        };
        beforeEach(async()=>{
            genre = new Genre({ name: 'genre1' });
            await genre.save();
            id = genre._id;
            isAdmin = true;
            user = {_id: new Types.ObjectId().toHexString(), isAdmin};
            token = new User(user).generateAuthToken();
        });

        it('should return 401 if client is not logged in',async()=>{
            token = '';
            const res = await exec();
            expect(res.status).toBe(401);
        });

        it('should return 403 if client is not admin',async()=>{
            user.isAdmin = false;
            token = new User(user).generateAuthToken();
            const res = await exec();
            expect(res.status).toBe(403);
        });

        it('should return 404 if invalid id is passed',async()=>{
            id = 1;
            const res = await exec();
            expect(res.status).toBe(404);
        });

        it('should return 404 if no genre with given id exsits',async()=>{
            id = new Types.ObjectId();
            const res = await exec();
            expect(res.status).toBe(404);
        });

        it('should delete the genre if the id is valid',async()=>{
            const res = await exec();
            expect(res.status).toBe(200);
        });

        it('should return the genre id if it successfully deleted',async()=>{
            const res = await exec();
            expect(res.body.success).toBeTruthy();
            expect(res.body).toHaveProperty('id');
        });
    });
});