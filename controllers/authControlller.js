const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/user');
const Mongoose = require('mongoose');

const { EMAIL_PROVIDER, JWT_COOKIE } = require('../constants');
const { secret, tokenLife } = keys.jwt;

const registerUser = async (req, res) => {
    let session = null;
    try {
        const { name, email, password, role, phoneNumber, gender } = req.body;

        // Validation checks
        if (!email) {
            return res.status(400).json({ error: 'You must enter an email address.' });
        }
        if (!name) {
            return res.status(400).json({ error: 'You must enter your full name.' });
        }
        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        // Start a database session
        session = await Mongoose.startSession();
        session.startTransaction();

        // Check if the email is already in use
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'That email address is already in use.' });
        }

        // Create a new user object
        const newUser = new User({
            email,
            name,
            password,
            role,
            gender,
            phoneNumber
        });

        // Hash the password before saving the user
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        // Save the new user to the database
        const registeredUser = await newUser.save();

        // Commit the transaction
        await session.commitTransaction();
        session.endSession();

        // Create JWT token
        const payload = { id: registeredUser.id };
        const token = jwt.sign(payload, secret, { expiresIn: tokenLife });


        // Send response with token and user details
        res.status(200).json({
            success: true,
            code: 200,
            token: `Bearer ${token}`,
            user: {
                id: registeredUser.id,
                name: registeredUser.name,
                email: registeredUser.email,
                role: registeredUser.role,
                password: registeredUser.password,
                gender: registeredUser.gender,
                phoneNumber: registeredUser.phoneNumber
            }
        });
    } catch (error) {
        console.error('Error registering user:', error);
        if (session) {
            await session.abortTransaction();
            session.endSession();
        }
        res.status(500).json({ error: 'Internal server error.' });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'You must enter an email address.' });
        }

        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ error: 'No user found for this email address.' });
        }

        if (user.provider !== EMAIL_PROVIDER.Email) {
            return res.status(400).send({
                error: `That email address is already in use using ${user.provider} provider.`
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                error: 'Password Incorrect'
            });
        }

        const payload = {
            id: user.id
        };

        const token = jwt.sign(payload, secret, { expiresIn: tokenLife });

        if (!token) {
            throw new Error();
        }

        res.status(200).json({
            success: true,
            code: 200,
            token: `Bearer ${token}`,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                password: user.password,
                gender: user.gender,
                phoneNumber: user.phoneNumber
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(400).json({
            error: 'Your request could not be processed. Please try again.'
        });
    }
};

module.exports = {
    registerUser, loginUser
};
