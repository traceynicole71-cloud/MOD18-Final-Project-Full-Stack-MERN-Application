const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Helper function to generate signed JWT payload
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '30d'
    });
};

//POST register new user account
const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        //Check to see if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('A user account with that email already exists');
        }

        //Trigger pre-save bcrypt hashing hook when initializing document
        const user = await User.create({ name, email, password });

        if (user) {
            res.status(201).json({
                success: true,
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(400);
            throw new Error('Invalid registration data provided');
        }
    } catch (error) {
        next(error);
    }
};

//POST authenticate user credentials and distribute session token
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        //Force selection of hidden password field
        const user = await User.findOne({ email }).select('+password');
        //Use schema model to verify hashes
        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                success: true,
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password credentials');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { registerUser, loginUser };