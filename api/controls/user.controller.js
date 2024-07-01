import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
    res.json({ message: 'Hello World' });
};

export const updateUser = async (req, res,next) => { 
    if (req.user._id !== req.params.userId) {
        return next(errorHandler(403, 'you are not authorized to update'));
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(errorHandler(400, 'password must be at least 6 characters long'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, 'username must be between 7 and 20 characters long'));
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'username cannot contain spaces'));
        }
        if (req.body.username !== req, body.username.toLowerCase()) {
            return next(errorHandler(400, 'username must be lowercase'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 'username must contain only alphanumeric characters'));
        }
        try {
            const updateUser = await User.findByIdAndUpadate(req.params.userId, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                },
            }, { new: true });
            const { password, ...rest } = updateUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error);
        }
    }
}