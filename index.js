require('rootpath')();
require('dotenv').config();

// Requirement daripada aplikasi kita
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const hbs = require('hbs'); // Frontend
const path = require('path');

const userController = require('./users/user.controller')
const articleController = require('./articles/article.controller');
const homepageController = require('./homepage/homepage.controller');
const tempController = require('./temp/temp.controller');
const errorHandler = require('./_helpers/error-handler')

app.use(bodyParser.urlencoded( {extended: false} )); //x-www-form-urlencoded
app.use(bodyParser.json()); //aplication/json

// Test Route Untuk Pertama Kalinya
app.get('/', ( req, res, next ) => {
    res.status(200).json({
        message: "Berhasil",
        err: null,
        base_url: process.env.BASE_URL,
    })
});

// Set view file
app.set('views', path.join(__dirname, 'views'));
// Set view engine
app.set('view engine', 'hbs')
//Set public folder
app.use('/assets', express.static(__dirname + '/public'))

// Route to Users
app.use('/users', userController);

// Route to articles
app.use('/articles', articleController);

// Route to homepage
app.use('/homepage',homepageController);

// Route to temp
app.use('/temp',tempController);

// Global Handler
app.use(errorHandler)

const port = process.env.PORT ? process.env.PORT : 4000;
app.listen(port, () => {
    console.log(`This Application is running in port -> ${port}`);
});