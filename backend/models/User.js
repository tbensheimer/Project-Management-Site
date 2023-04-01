const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    profileUrl: {
        type: String,
        required: true
    },
    isOnline: {
        type: Boolean
    }
})

userSchema.statics.signup = async function (email, password, displayName, profileUrl) {

    if(!email || !password || !displayName || !profileUrl) {
        throw Error('Please fill all fields');
    }
    if(!validator.isEmail(email)) {
        throw Error('Please enter a valid email');
    }
    if(!validator.isStrongPassword(password)) {
        throw Error('Please enter a stronger password');
    }
    
    let isMatch = await this.findOne({email});

    if(isMatch) {
        throw Error('An account exists for this email');
    }

    const salt = await bcrypt.genSalt(12);

    const hashed = await bcrypt.hash(password, salt);

    const user = await this.create({email, password: hashed, displayName, profileUrl, isOnline: true});

    if(user) {
        return user;
    }
    else {
        throw Error('There was an error creating user');
    }
}

userSchema.statics.login = async function (email, password) {

    if(!email || !password) {
        throw Error("Please fill all fields");
    }

    if(!validator.isEmail(email)) {
        throw Error("Please enter valid email");
    }

    const user = await this.findOne({email});

    if(!user) {
        throw Error('Wrong username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch) {

        const updatedBody = user;
        updatedBody.isOnline = true;

        this.findByIdAndUpdate(user._id, updatedBody);
        return user;
    }
    else {
        throw Error('Wrong username or password');
    }
}

userSchema.statics.logout = async function (email) {

    const user = await this.findOne(email);

    if(!user) {
        throw Error("No user associated with this email");
    }
    const updatedUser = user;

    updatedUser.isOnline = false;

    const updated = await this.findByIdAndUpdate(user._id, updatedUser);

    if(!updated) {
        throw Error("There was an error while logging user out");
    }

    return updated;
}

module.exports = mongoose.model("User", userSchema);