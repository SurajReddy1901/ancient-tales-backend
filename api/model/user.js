const mongoose = require('mongoose')
userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:String,
    email:String,
    password:String,
    phone:Number
})

module.exports = mongoose.model('user', userSchema)