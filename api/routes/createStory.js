const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const CreateStories = require('../model/createStory')
const cloudinary = require('cloudinary').v2;
const checkAuth = require('../middleware/chekAuth')

cloudinary.config({
    cloud_name: 'dap6nmxux',
    api_key: '153955364979978',
    api_secret: '5oQ1hMpfVgseziLecAyvCSVgvuQ'
});

router.get('/', checkAuth, (req, res, next) =>  {
    CreateStories.find()
    .select('_id title authorname description photo contents')
    .then(result => {
        res.status(200).json({
            myStories: result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})


router.post('/', checkAuth, (req, res, next) => {
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        console.log(result)
        myCreateStories = new CreateStories({
            _id: new mongoose.Types.ObjectId,
            title: req.body.title,
            authorname: req.body.authorname,
            description: req.body.description,
            photo: result.url,
            contents: req.body.contents
        });
        myCreateStories.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    new_story: result
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })
    });
})

// Get elements from the database for the single id...

router.get('/:id', checkAuth, (req, res, next) => {
    const _id = req.params.id;
    CreateStories.findById(_id)
    .select('_id title authorname description photo contents')
    .then(result => {
        res.status(200).json({
            mystories: result
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
})
module.exports = router;
