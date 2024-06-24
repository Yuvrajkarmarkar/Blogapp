import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import cors from "cors";



dotenv.config();

mongoose.connect(process.env.MONGO).then(
    () => {
        console.log('mongodb connected');
    }
).catch((err) => {
    console.log(err);
})

const app = express();

app.use(express.json());
app.use(cors()); 



app.listen(3000, () => {
    console.log('mongodb');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal error';
    res.status(statusCode).json(
        {
            success: false,
            statusCode,
            message
        });
    
});