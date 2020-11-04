// NPM Modules
const express = require('express')
const router = express.Router();


// Module that Exported to other Class
module.exports = router


// ROUTES
router.get('/', homepage)

// Article Service
const articleService = require('../articles/article.service');

// FUNCTION
async function homepage(req, res, next) {
    await articleService.getAll()
        .then((data) => {
            res.render('homepage', {
                data: data,
                length: data.length
            });
        })
}