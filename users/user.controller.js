// NPM Modules
const express = require('express')
const router = express.Router();
const Joi = require('joi');

// Middleware
const validateRequest = require('middleware/validate-request');


// Service for User
const userService = require('./user.service');


// Module that Exported to other Class
module.exports = router


// ROUTES
router.get('/', index)
router.get('/all', getAllUser)
router.get('/user/:id', getById)
router.post('/register', validateCreateJSON ,store);
router.put('/user/:id', getById, validateUpdateJSON, update);
router.delete('/user/:id', getById, _delete)


// FUNCTIONS
function index(req, res, next) {
    res.json({
        message: 'Welcome to User Endpoint',
    })
}

async function getAllUser(req, res, next) {
    await userService.getAll()
        .then(data => {
            if (data.length == 0){
                next("All Users Empty. Not found");
                return
            }
            res.status(200).json({
                message: "Data User didapatkan",
                data: data
            })
        })
        .catch( (err) => {
            next(err)
        } )
}

async function getById( req, res, next ) {
    await userService.getById(req.params.id)
            .then(data => {
                if (data == undefined) {
                    next("User not found")
                    return;
                }
                res.status(200).json({
                    message: "Ini Data usernya",
                    data: data
                })
            })
            .catch( (err) => {
                next(err)
            } )
}

// Register User
function create( req, res, next ) {
    // It should return view
}

async function store(req, res, next){    
    await userService.register(req.body)
    .then( (result) => {
        res.json({
            message: "Data Berhasil Masuk",
            data: result,
        }).status(201)
    } )
    .catch( (err) => {
        next(err)
    } )
}

// Update a User

function edit( req, res, next ) {
    // It should return view
}

async function update( req, res, next ){
    await userService.update(req.params.id, req.body)
        .then( (data) => {
            res.status(204).json({
                message: "Data berhasil di update",
                data: data,
            })
        } )
        .catch( (err) => {
            next(err)
        } )
}

// Delete User
async function _delete(req, res, next){
    await userService._delete(req.params.id)
    .then((data) => {
        res.json({
            message: "Delete User berhasil"
        }).status(204)
    })
    .catch( (err) => {
        next(err)
    } )
}

function validateCreateJSON(req, res, next){
    const Schema = Joi.object({
        first_name: Joi.string()
                    .max(256)
                    .required(),
        last_name: Joi.string()
                    .max(256)
                    .required(),
        password: Joi.string()
                    .required()
    }).with('first_name', 'last_name');
    validateRequest(req, next, Schema);
}

function validateUpdateJSON(req, res, next){
    const Schema = Joi.object({
        first_name: Joi.string()
                    .max(256)
                    .required(),
        last_name: Joi.string()
                    .max(256)
                    .required(),
    }).with('first_name', 'last_name');
    validateRequest(req, next, Schema);
}