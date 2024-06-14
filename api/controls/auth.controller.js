import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';


export const signup = async (req, res,next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password || username == ' ' || email == ' ' || password == ' ') {
        next(errorHandler(400, 'all fields must be filled'));
    }

    const hashPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password:hashPassword,
    });
    try {
        
        await newUser.save();
        res.json('success')
    }
    catch (error) {
        next(error);
    }
}