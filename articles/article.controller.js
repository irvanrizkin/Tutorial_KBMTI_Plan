const express = require('express')
const router = express.Router();
const Joi = require('joi');

// Article Service
const articleService = require('./article.service');

// User Service
const userService = require('../users/user.service');

// Middleware
const validateRequest = require('middleware/validate-request');

// Module Exports
module.exports = router

// Routes
router.get('/all', getAll)
router.get('/:id', getById)
router.post('/store', validateCreateJSON, store)
router.put('/:id', getById, validateUpdateJSON, update)
router.delete('/:id', getById, _delete)


// Functions

async function getAll(req, res, next){
    await articleService.getAll()
        .then( (data) => {
            res.status(200).json({
                message: "Berhasil mengambil data",
                data: data
            })
        } )
        .catch( (err) => {
            next(err)
        } )
}

async function getById(req, res, next){
    await articleService.getById(req.params.id)
        .then( async (data) => {
            if (data == undefined) {
                next("Article not found")
                return;
            }
            data.author = await userService.getById(data.user_id)
            res.status(200).json({
                message: "Berhasil mengambil data pada artikel spesifik",
                data: data,
            })
        } )
}

// Register a Article

function create( req, res, next ){
    // It should return view
}

async function store( req, res, next ){
    await articleService.store(req.body)
    .then( (data) => {
        res.status(201).json({
            message: "Input Article Berhasil",
            data: data
        })
    } )
    .catch ( (err) => next(err) )
}

// Update a Article

async function update( req, res, next ){
    await articleService.update(req.params.id, req.body)
        .then( (data) => {
            res.status(204).json({
                message: "Update Berhasil",
                data: data,
            })
        } )
        .catch( (err) => {
            next(err)
        } )
}

async function _delete( req, res, next ){
    await articleService.delete(req.params.id)
        .then( (data) => {
            if (data.affectedRows == 0) {
                next("Article not found")
                return;
            }
            res.status(204).json({
                message: "Data berhasil di delete",
                data: data
            })
        } )
        .catch( (err) => {
            next(err)
        } )
}

function validateCreateJSON( req, res, next ) {
    const Schema = Joi.object({
        title: Joi.string()
                .required()
                .max(256),
        content: Joi.string()
                .required(),
        user_id : Joi.number()
                .required(),
    }).with('title', 'content')

    validateRequest(req, next, Schema);
}

function validateUpdateJSON( req, res, next ) {
    const Schema = Joi.object({
        title: Joi.string()
                .required()
                .max(256),
        content: Joi.string()
                .required(),
    }).with('title', 'content')

    validateRequest(req, next, Schema);
}