const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')



router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                email: req.body.email,
                password: hash,
                phone: req.body.phone
            })

            user.save()
                .then(result => {
                    res.status(200).json({
                        new_user: result
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
})

router.post('/signin', (req, res, next) => {
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    msg: 'User Not Found!!!'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {

                if (result) {
                    const token = jwt.sign({
                        username: user[0].username,
                        email: user[0].email,
                        phone: user[0].phone
                    },
                        // Token Key Password 
                        '2003',
                        {
                            expiresIn: "24h"
                        }
                    );
                    res.status(200).json({
                        username: user[0].username,
                        email: user[0].email,
                        phone: user[0].phone,
                        token: token
                    })
                }
                if (!result) {
                    return res.status(401).json({
                        msg: 'Password Matching Failed!!'
                    })
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})
module.exports = router;