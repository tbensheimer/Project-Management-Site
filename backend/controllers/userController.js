const User = require('../models/User');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
let ObjectId = mongoose.Types.ObjectId; 

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

const getAllUsers = async (req, res) => {

    try {
    const users = await User.find();

    res.status(200).json({users})
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

const signupUser = async (req, res) => {

    try {
        const {email, password, displayName, profileUrl} = req.body;

        const user = await User.signup(email, password, displayName, profileUrl);

        // user.isOnline = true;
        // User.updateOne(user); // test this in postman

        const token = createToken(user._id);
        

        res.status(200).json({_id: user._id, displayName, email, profileUrl, token})
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

const loginUser = async (req, res) => {

    try {
    const {email, password} = req.body;

    const user = await User.login(email, password);

    const updatedUser = user;
    updatedUser.isOnline = true;
    await User.findByIdAndUpdate(user._id, updatedUser);

    const token = createToken(user._id);

    res.status(200).json({_id: user._id, displayName: user.displayName, email: user.email, profileUrl: user.profileUrl, token})
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

const logoutUser = async (req, res) => {

    try {
        const {email} = req.body;

        const user = await User.logout(email);

        if(user) {
            res.status(200).json({success: "User log out success!"});
        }
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

const editAccount = async (req, res) => {
    try {
        const {_id, email, oldPassword, newPassword, displayName, profileImage} = req.body;

        if(newPassword && !oldPassword) {
            res.status(400).json({error: "Please provide your old password to change passwords"});
            return;
        }
        else if(!newPassword && oldPassword) {
            res.status(400).json({error: "Please provide a new password to change into. If you don't want to change passwords, then delete the old password."});
            return;
        }

       await User.validate(email, newPassword, displayName, profileImage);

        if(newPassword && oldPassword) {
            var user = await User.passwordCheck(_id, oldPassword, newPassword);

            if(user) {
                user.email = email;
                user.displayName = displayName;
                user.profileUrl = profileImage;

                await User.findByIdAndUpdate(_id, user);
            }
        }
        else if (!newPassword && !oldPassword) {
          
            await User.findOneAndUpdate({_id: new ObjectId(_id)}, {email: email, displayName: displayName, profileUrl: profileImage});
            
            var user = await User.findOne({_id: new ObjectId(_id)});
        }
            res.status(200).json(user);
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {signupUser, loginUser, logoutUser, getAllUsers, editAccount};