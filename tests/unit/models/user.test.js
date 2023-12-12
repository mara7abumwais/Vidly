import { Types } from 'mongoose';
import { User } from '../../../models/user.model.js';
import jwt from 'jsonwebtoken';

describe('user.generateAuthToken',()=>{
    it('should be return a valid JWT',()=>{
        const payload= {
            _id:new Types.ObjectId().toHexString(),
            isAdmin:true
        };
        const user = new User(payload);
        const token = user.generateAuthToken();
        console.log(process.env.vidly_jwtPrivateKey)
        const decoded = jwt.verify(token,process.env.vidly_jwtPrivateKey);
        expect(decoded).toMatchObject(payload);
        
    })
});