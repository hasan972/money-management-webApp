// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const User = require('../model/User')
// const registarValidator = require('../validator/registerValidator')
// const loginValidator = require('../validator/loginValidator')
// const { serverError, resourceError } = require('../util/error')
// //for Login controller
// module.exports = {
//     login(req, res) {
//         //Extract data from request
//         let { email, password } = req.body
//         //validate data//loninvalidator is a function and to give an object in the from of argument (ES6 sentext)
//         let validate = loginValidator({ email, password })
//         if (!validate.isValid) {
//             return res.status(400).json(validate.error)
//         }
//         //check for user availability
//         User.findOne({ email })
//             .then(user => {
//                 if (!user) {
//                     return resourceError(res, 'User not found')
//                 }
//                 //Compare password
//                 bcrypt.compare(password, user.password, (err, result) => {
//                     if (err) {
//                         return serverError(res, err)
//                     }
//                     if (!result) {
//                         return resourceError(res, 'Password dosn\'t match')
//                     }
//                 })
//             })
//             .catch(error => serverError(res, error))
//         //Generate token for password//sign(paylode->some sort of data,it's user related.We break this token and get some data from user using this playlod
//         let token = jwt.sign({
//             _id: user._id,
//             name: user.name,
//             email: user.email
//         }, 'SECRET', { expiresIn: '2h' })
//         res.status(200).json({
//             massage: 'Lpgin Successfully',
//             token: `Bearer ${token}`
//         })
//     },
//     //for Registration controller or methode
//     register(req, res) {
//         //read client data
//         let { name, password, email, confirmPassword } = req.body
//         //validate have two object
//         let validate = registarValidator({ name, email, password, confirmPassword })
//         if (!validate.isValid) {
//             res.status(400).json(validate.error)
//         } else {
//             //check dublicate data

//             User.findOne({ email })
//                 .then(user => {
//                     //Chack for user is stay or null..
//                     // console.log(user)
//                     // res.json({ user })
//                     //Chack the user is  exist...
//                     if (user) {
//                         return res.status(400).json({
//                             massage: 'Email Already Exist'
//                         })
//                     }
//                     // if the user not exist than we create the user...using the bcrypt for hashing the password

//                     bcrypt.hash(password, 11, (err, hash) => {
//                         if (err) {
//                             return resourceError(res, 'Server error occurred')
//                         }
//                         let user = new User({
//                             name,
//                             email,
//                             password: hash
//                         })
//                         //for save the registar data for save methode
//                         user.save()
//                             .then(user => {
//                                 res.status(201).json({
//                                     massage: 'User created succussfully',
//                                     user
//                                 })
//                             })
//                             .catch(error => serverError(res, error))
//                     })

//                 })
//                 .catch(error => serverError(res, error))

//         }

//         //new user object
//         //save to database
//         //response back with new data
//     }
// }


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const User = require('../model/User')
const { serverError, resourceError } = require('../util/error')

// login controller
module.exports = {
    login(req, res) {
        let { email, password } = req.body
        let validate = loginValidator({ email, password })

        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        }

        User.findOne({ email })
            // Use Populate for transaction
            .then(user => {
                if (!user) {
                    return resourceError(res, 'User Not Found')
                }
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        return serverError(res, err)
                    }
                    if (!result) {
                        return resourceError(res, 'Password Doesn\'t Match')
                    }

                    let token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        amount: user.amount,
                        income: user.income,
                        expense: user.expense,
                        transactions: user.transactions
                    }, 'SECRET', { expiresIn: '2h' })

                    res.status(200).json({
                        message: 'Login Successful',
                        token: `Bearer ${token}`
                    })

                })
            })
            .catch(error => serverError(res, error))

        // Generate Token and Response Back
    },
    register(req, res) {
        let { name, email, password, confirmPassword } = req.body
        let validate = registerValidator({ name, email, password, confirmPassword })

        if (!validate.isValid) {
            return res.status(400).json(validate.error)
        } else {
            User.findOne({ email })
                .then(user => {
                    if (user) {
                        return resourceError(res, 'Email Already Exist')
                    }

                    bcrypt.hash(password, 11, (err, hash) => {
                        if (err) {
                            return resourceError(res, 'Server Error Occurred')
                        }

                        let user = new User({
                            name,
                            email,
                            password: hash,
                            balance: 0,
                            expense: 0,
                            income: 0,
                            transactions: []
                        })

                        user.save()
                            .then(user => {
                                res.status(201).json({
                                    message: 'User Created Successfully',
                                    user
                                })
                            })
                            .catch(error => serverError(res, error))
                    })
                })
                .catch(error => serverError(res, error))
        }
    },
    allUser(req, res) {
        User.find()
            .then(users => {
                res.status(200).json(users)
            })
            .catch(error => serverError(res, error))
    }
}
