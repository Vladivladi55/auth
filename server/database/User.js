const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const shortid = require('shortid')
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true, 
        validate:[isEmail, 'please enter a valid email']
    },
    password: {
        type: String,
        requried: true, 
        minlength: 6
    },
    id: {
        type: String,
        required: true, 
        default: shortid.generate()
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;