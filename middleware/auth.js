import jwt from 'jsonwebtoken';

export const auth =(req,res,next)=>
{
    try{
        const token = req.header('x-auth-token');
        if(!token)
            return res.status(401).json('Access denied. No token provided.')
        const decoded = jwt.verify(token,process.env.vidly_jwtPrivateKey);
        req.user = decoded;
        next();
    }catch(err)
    {
        return res.status(400).json('Invalid token.')
    }
}