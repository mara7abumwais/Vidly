import {server} from '../../app.js';
import request from 'supertest';
import {User} from '../../models/user.model.js';
import { Genre } from '../../models/genre.model.js';
import { Types } from 'mongoose';

describe('auth middleware',()=>{
    afterEach(async()=>{
        server.close();
        await Genre.deleteMany({});
    });

    let token;
    let isAdmin;
    let user;

    beforeEach(()=>{
        isAdmin = true;
        user = {_id: new Types.ObjectId().toHexString(), isAdmin};
        token = new User(user).generateAuthToken();
        });

    const exec = async()=>{
        return await request(server)
        .post('/api/genre')
        .set('x-auth-token',token)
        .send({name:'genre3'});
    };

    it('should return 401 if no token is provided',async()=>{
        token = '';
        const res =await exec();
        expect(res.status).toBe(401);
    });

    it('should return 404 if token is invalid',async()=>{
        token = 'a';
        const res =await exec();
        expect(res.status).toBe(400);
    });

    it('should return 403 if client is not admin',async()=>{
        user.isAdmin = false;
        token = new User(user).generateAuthToken();
        const res = await exec();
        expect(res.status).toBe(403);
    });

    it('should return 200 if token is valid',async()=>{
        const res =await exec();
        expect(res.status).toBe(200);
    });
})