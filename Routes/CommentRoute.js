const express = require('express')
const Comment = require('../Models/comment')
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const router = require('./productRoute');
//creating user comment routes
router.post('/add/comment',
    auth.varifyUser,
    auth.varifyParticularUser,
    (req, res) => {
        var userId = req.body.userId;
        var productId = req.body.productId
        var comment = req.body.comment
        var data = Comment({ userId: userId, productId: productId, comment: comment })
        data.save().then(function (result) {
            res.status(201).json({ message: "Product Added!!" })
        })
            .catch(function (err) {
                res.status(500).json({ message: err })
            })

    })

router.delete('/delete/comment/:cId',
    auth.varifyUser,
    auth.varifyAdminorUser, (req, res) => {
        const id = req.params.cId
        Comment.deleteOne({ _id: id }).then(function () {
            res.status(200).json({ message: "product deleted!!" })

        })
            .catch(function (err) {
                res.status(500).json({ message: err })
            })
    })
module.exports = router