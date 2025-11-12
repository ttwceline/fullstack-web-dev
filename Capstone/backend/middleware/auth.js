import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

export default async function authMiddleware(req, res, next) {
    //Grab the BEARER TOKEN from the request header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided, authorization denied' });
    }

    const token = authHeader.split(' ')[1];

    //VERIFY TOKEN
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(payload.id).select('-password');
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not found, authorization denied' });
        }
        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware or route handler

    }
    catch (error) {
        console.log("JWT Verification Error:", error);
        return res.status(401).json({ success: false, message: 'Token is not valid, authorization denied' });
    }
}
