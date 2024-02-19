var createerror = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

(async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/test")
        console.log('Connected to DB');
    }catch(error){
        console.log('Unable to connect to the DB:', error);
    }
})()

const router = require('./routes/index');
app.use('/',router);

app.use(function(req,res,next){
    next(createError(404));
});

const PORT = 5600;
app.listen(PORT, console.log(`Server running port ${PORT}`));