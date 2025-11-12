import User from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';
const TOKEN_EXPIRES_IN = '24h';

const createToken = (userId) => jwt.sign({ id:userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });

// REGISTER USER
export async function registerUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please fill all fields' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: 'Please enter a valid email' });
    }
    if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    try{
        if (await User.findOne({ email })) {
            return res.status(409).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashedPassword});
        const token = createToken(user._id);
        return res.status(201).json({ success: true, token, user: { id: user._id, name: user.name, email: user.email} });
    }

     catch (error) {
    console.error('Detailed Error:', error); // <-- log full error
    res.status(500).json({ success: false, message: error.message }); // <-- send error message to client
}
}
// LOGIN USER
export async function loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = createToken(user._id);
       res.json({ success: true, token, user: { id: user._id, name: user.name, email: user.email } });
    }
    catch (error) {
    console.error('Detailed Error:', error); // <-- log full error
    res.status(500).json({ success: false, message: error.message }); // <-- send error message to client
}
}

// GET USER PROFILE
export async function getUserProfile(req, res) {
    try {
        const user = await User.findById(req.user.id).select('name email');
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        res.json({ success: true, user });
    } catch (error) {
    console.error('Detailed Error:', error); // <-- log full error
    res.status(500).json({ success: false, message: error.message }); // <-- send error message to client
}
}

// UPDATE USER PROFILE
export async function updateUserProfile(req, res) {
    const { name, email } = req.body;

    if (!name || !email || !validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: 'Name and valid email are required' });
    }

    try {
        const exists = await User.findOne({ email, _id: { $ne: req.user.id } });
        if (exists) {
            return res.status(409).json({ success: false, message: 'Email already in use' });
        }

        const user = await User.findByIdAndUpdate(
            req.user.id, { name, email }, 
            { new: true, runValidators: true, select: 'name email' }
        );
        res.json({ success: true, user });

    } catch (error) {
        console.error('Detailed Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

// CHANGE PASSWORD
export async function changePassword(req, res) {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword || newPassword.length < 6) {
        return res.status(400).json({ success: false, message: 'Current and new password (min 6 chars) are required' });
    }
    try {
        const user = await User.findById(req.user.id).select('password');
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Current password is incorrect' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        console.error('Detailed Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}