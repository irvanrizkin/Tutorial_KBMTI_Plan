// NPM Modules
const express = require('express')
const router = express.Router();


// Module that Exported to other Class
module.exports = router


// ROUTES
router.get('/', homepage)

// FUNCTION
function homepage(req,res,next) {
    res.render('homepage');
}

