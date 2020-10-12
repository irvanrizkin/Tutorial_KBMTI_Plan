// NPM Modules
const express = require('express')
const router = express.Router();


// Module that Exported to other Class
module.exports = router


// ROUTES
router.get('/add-article', create)
router.get('/edit-article', updateView)
router.get('/show-article', show)

// FUNCTION
function updateView(req, res, next) {
    res.render('article-update')
}

function create(req, res, next){
    // It should return view
    res.render('article-add')
}

function show(req,res,next) {
    res.render('article-get')
}

