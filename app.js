const express = require('express')
const app = express();

const userRoute = require('./api/routes/user')
const createstoryRoute = require('./api/routes/createStory')
// Mongoose
const mongoose = require('mongoose')
// Body Parser
const bodyParser = require('body-parser')
const { urlencoded, json } = require('body-parser')

const cors = require('cors');

const fileUpload = require('express-fileupload');


// -----------------------------------
mongoose.connect('mongodb+srv://Suraj1901:Suraj1901@surajreddy.ckcds1c.mongodb.net/?retryWrites=true&w=majority&appName=SurajReddy', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
    console.log('Connected Successfully with Database!!')
});
mongoose.connection.on('error', err => {
    console.log('Connection Failed!!')
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(fileUpload({
    useTempFiles:true
  }))
app.use(cors());

app.use('/user', userRoute)
app.use('/createstory', createstoryRoute)


app.get('*', (req, res, next) => {
    res.status(200).json({
        message: 'bad request'
    })
})
module.exports = app;