// NPM Modules
const express = require('express')
const router = express.Router();


// Module that Exported to other Class
module.exports = router


// ROUTES
router.get('/add-article', create)
router.get('/edit-article', updateView)
router.get('/show-article', show)

// Article Service
const articleService = require('../articles/article.service');

// FUNCTION
function updateView(req, res, next) {
    res.render('article-update')
}

function create(req, res, next) {
    // It should return view
    res.render('article-add')
}

async function show(req, res, next) {
    await articleService.getById(req.query.id)
        .then((data) => {
            res.render('article-get', {
                data: data
            })
        })
}