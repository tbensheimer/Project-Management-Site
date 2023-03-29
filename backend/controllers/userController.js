const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

const signupUser = async (req, res) => {

    try {
        const {email, password, displayName, profileUrl} = req.body;

        const user = await User.signup(email, password, displayName, profileUrl);

        // user.isOnline = true;
        // User.updateOne(user); // test this in postman

        const token = createToken(user._id);
        

        res.status(200).json({displayName, profileUrl, token})
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

const loginUser = async (req, res) => {

    try {
    const {email, password} = req.body;

    const user = await User.login(email, password);

    user.isOnline = true;
        User.updateOne(user); // test this in postman

    const token = createToken(user._id);

    res.status(200).json({displayName: user.displayName, profileUrl: user.profileUrl, token})
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {signupUser, loginUser};