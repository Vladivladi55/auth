const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRouter = require('./routes/authRouter');
const {urlencoded} = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const cookieParser = require('cookie-parser');

mongoose.connect('mongodb://localhost:27017/users', {useUnifiedTopology: true, useNewUrlParser: true});
    mongoose.connection.on('error', (error)=> {
        console.error('error')
    });
    mongoose.connection.once('open', (err)=>{
        console.log('db on')
    });

app.use(cookieParser());

app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use('/api',authRouter);



app.listen(5000)