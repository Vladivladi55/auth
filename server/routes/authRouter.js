const {Router, response}  = require('express');
const authRouter = Router();
const authController = require('../controllers/authController');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const User = require('../database/User');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const { generate } = require('shortid');

authRouter.use(cookieParser());

const maxAge = 3 * 24 * 60 * 60;

const createToken = (user, statusCode, req, res) => {
    const token = jwt.sign(user.__d);
    res.cookie('jwt', token, { 
        expires:maxAge,
        secure: true, 
        httpOnly: true,
    });
    res.status(statusCode).json({
        status: "succes",
        token,
        user,
    });
};

authRouter.post('/test', (req, res) => {
    res.status(200).cookie('jwt', '5', {httpOnly: true, maxAge:maxAge});
    console.log(req.body);
})

authRouter.post('/register', async(req, res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password, 10);
    try {
        const user = await User.create({name, email, password});
        createToken();
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge});
        return res;
        console.log('succes');
    } catch (err) {
        console.log(err);
        res.status(400).send('error, user not created'); console.log('user not created');
    }
});

authRouter.post('/login', async (req, res) => {
    let email = req.body.email;
    let password = await bcrypt.hash(req.body.password, 10);
    try{
    let checkUser = await User.findOne({ email: email})
    if(!checkUser) console.log('email not found');
    let verified = bcrypt.compareSync(user.password, password);
    if(!verified) {
        console.log('wrong password') 
        console.log(password, checkUser.password);
    }
    let user = await User.login(email, password) 
    const token = createToken(user.__id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200);
    return res;
    } catch (err) {
        res.status(400);
    }
})

module.exports = authRouter;