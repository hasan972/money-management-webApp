const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRouter = require('./routers/userRoute')

const app = express()
app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//for registration route
app.use('/api/users', userRouter)


app.get('/', (req, res) => {
    res.json({
        message: 'WElcome to my server'
    })
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log('SERVER IS RUNNONG ON PORT ${PORT}')
    mongoose.connect('mongodb://localhost/money-management-app',
        { useNewUrlParser: true },
        () => {
            console.log('Database Connected...')
        });
})


// all commend for ful stack project and run both server side code and also clint side code

// 1.npm init -y
// give  the packet.json
// 2.touch serer.js
// create the File
// 3.npm i create-react-app
// 4.create react app client
// 5.npm install concurrently--save
// 6.npm install - g nodemon
// 7.npm install express
// and add some middle ware with this morgan body-perser cors mongoose passport passport-jwt
