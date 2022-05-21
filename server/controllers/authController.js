const bcrypt = require('bcrypt');
const User = require('../database/User')
const {response} = require('express');
const jwt = require('jsonwebtoken');
const async = require('async')

const createToken = (id) => { 
    return jwt.sign({id}, 'bratmibeliq')
  }
 

module.exports.register_post = async (req, res) => {
    let{username, email} = req.body;
    let password = await bcrypt.hash(req.body.password, 10);
    try{
        const user = await User.create({username, email, pasword});
        const token = createToken(user.id);
        res.cookie('jwt', token, {httpOnly: true, maxAge:1000*60*60*24*3});
    } catch(err) { 
        console.log(err);
        res.status(400).send('error, user not created')
    }
};  

module.exports.login_post = async (req, res) => {
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user) return res.status(403).send('no user with this email found');
        const validatePass = await bcrypt.compare(req.body.password, User.password);
        if(!validatePass) return res.status(403).send('wrong pass');
    } catch(error) {
        console.log(error); res.status(500).send('error, wrong increditinals');
    }
};