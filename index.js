require('rootpath')();
require('dotenv').config();

// Requirement daripada aplikasi kita
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const userController = require('./users/user.controller')
const articleController = require('./articles/article.controller');
const errorHandler = require('./_helpers/error-handler')

app.use(bodyParser.urlencoded( {extended: false} )); //x-www-form-urlencoded
app.use(bodyParser.json()); //aplication/json

// Route to Users
app.use('/users', userController);

// Route to articles
app.use('/articles', articleController);

// Global Handler
app.use(errorHandler)

const port = process.env.PORT ? process.env.PORT : 4000;
app.listen(port, () => {
    console.log(`This Application is running in port -> ${port}`);
});