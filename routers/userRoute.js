const router = require("express").Router()
const { login, register } = require('../controllers/userController')

//For Our registration Route
//we using controlar later
router.post('/register', register),
    //For Login route
    router.post('/login', login)


module.exports = router

//rest client tool is postMan