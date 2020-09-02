require('rootpath');
require('dotenv').config();

// Requirement daripada aplikasi kita
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

// Configuration terhadap requirement
app.use(bodyParser.urlencoded( { extended: false } ));
app.use(bodyParser.json())

// Route -> API Routes
// Controller bernama User, di mana nanti kita akan mengkoneksikannya dengan localhost DB.

// Error Handler

const port = process.env.PORT ? process.env.PORT : 4000;
app.listen(port, () => {
    console.log(`This Application is running in port -> ${port}`);
});