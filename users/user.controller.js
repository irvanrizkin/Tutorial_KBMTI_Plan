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
// router.get('/allByModel', getAllByModel)
router.get('/user/:id', getById)
router.post('/register', validateRegisterUser ,registerUser);
router.put('/user/:id', validateUpdateUser, updateUser);
router.delete('/user/:id', deleteUser)


// FUNCTIONS
function index(req, res, next) {
    res.json({
        message: 'Welcome to User Endpoint',
    })
}

async function getAllUser(req, res, next) {
    await userService.getAll()
        .then(data => {
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
                if (data.length == 0) {
                    next("Data tidak ada")
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
async function registerUser(req, res, next){    
    await userService.register(req.body)
    .then( (result) => {
        res.json({
            message: "Data Berhasil Masuk",
            data: result,
        }).status(200)
    } )
    .catch( (err) => {
        next(err)
    } )
}

function validateRegisterUser(req, res, next){
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

// Update a User
async function updateUser( req, res, next ){
    await userService.update(req.params.id, req.body)
        .then( (data) => {
            res.status(200).json({
                message: "Data berhasil di update",
                data: data,
            })
        } )
        .catch( (err) => {
            next(err)
        } )
}

function validateUpdateUser(req, res, next){
    const Schema = Joi.object({
        first_name: Joi.string()
                    .max(256)
                    .required(),
        last_name: Joi.string()
                    .max(256)
                    .required()
    }).with('first_name', 'last_name');

    validateRequest(req, next, Schema)
}

// Delete User
async function deleteUser(req, res, next){
    await userService._delete(req.params.id)
    .then((data) => {
        res.json({
            message: "Delete User berhasil"
        }).status(200)
    })
    .catch( (err) => {
        next(err)
    } )
}