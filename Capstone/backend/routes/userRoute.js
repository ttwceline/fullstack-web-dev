import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, changePassword} from '../controller/userController.js';
import authMiddleware from '../middleware/auth.js';

const userRouter = express.Router();

// PUBLIC LINKS
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// PRIVATE LINKS protect also
userRouter.get('/me', authMiddleware, getUserProfile);
userRouter.put('/profile', authMiddleware, updateUserProfile);
userRouter.put('/password', authMiddleware, changePassword);

export default userRouter;