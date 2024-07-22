const mongoose = require('mongoose')

createStorySchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:String,
    authorname: String,
    description:String,
    photo:String,
    contents:String
})

module.exports = mongoose.model('createstory', createStorySchema);