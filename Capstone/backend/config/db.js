import mongoose from 'mongoose';

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://cttw:taskapp25@cluster0.fcrbble.mongodb.net/Capstone')
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });
}

