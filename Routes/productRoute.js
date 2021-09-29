const express = require('express');
const router = express.Router();
const product = require('../models/productModle');
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator');
const upload = require('../middleware/upload')
//creating user products routes
const multer = require('multer')
router.post('/product/insert', [
    check('area', 'area must be specified').not().isEmpty(),
    check('price', 'price must be written').not().isEmpty(),
    check('contact', "contact must be added").not().isEmpty(),
    check('userId', "userId Must be filled").not().isEmpty()
],
    auth.varifyUser,
    auth.varifyAdminorUser,/// change thooose auth names man
    function (req, res) {
        const errors = validationResult(req)
        if (errors.isEmpty) {
            const image = "noimg";
            const area = req.body.area;
            const price = req.body.price;
            const location = req.body.location;
            const phNo = req.body.phNo;
            const userId = req.body.userId;
            const pdata = new product({ image: image, area: area, price: price, location: location, phNo: phNo, userId: userId });
            pdata.save().then(function (data) {
                //console.log(data._id)
                res.status(201).json({ success: true, message: "Success", id: data._id })
                //console.log(req.body)
            }).catch(function (e) {
                res.status(201).json({ success: false, message: "something went wrong" })
            })
        }
        else {
            res.status(201).json({ success: false, msg: "err" })
        }
    })
//// yo ni hrna xa haii ak patak postman bata check grna xa

router.get('/interior/:id',
    auth.varifyUser,
    auth.varifyAdminorUser, (req, res) => {
        const id = req.params.id
        product.find({ _id: id }).then(function (data1) {
            console.log(data1)
            res.status(200).json({ success: true, data: data1 })
        }).catch(function (e) {
            res.status(201).json({ success: false, message: "something went wrong" })
        })
    })


router.get('/interior/webs/:id',
    auth.varifyUser,
    auth.varifyAdminorUser, (req, res) => {
        const id = req.params.id
        product.findOne({ _id: id }).then(function (data1) {
            console.log(data1)
            res.status(200).json({ success: true, data: data1 })
        }).catch(function (e) {
            res.status(201).json({ success: false, message: "something went wrong" })
        })
    })

router.get('/interior/web/:id',
    auth.varifyUser,
    (req, res) => {
        const id = req.params.id
        console.log("here")
        console.log(id)
        product.find({ userId: id }).then(function (data1) {
            console.log(data1)
            res.status(200).json({ success: true, data: data1 })
        }).catch(function (e) {
            res.status(201).json({ success: false, message: "something went wrong" })
        })
    })
router.delete('/product/delete/:pid',
    auth.varifyUser,
    auth.varifyAdminorUser, function (req, res) {
        const pid = req.params.pid;
        product.deleteOne({ _id: pid })
            .then(function () {
                res.status(200).json({ message: "product deleted!!" })
            })
            .catch(function (err) {
                res.status(500).json({ message: err })
            })
    })
router.put("/product/image/:id", auth.varifyUser, (req, res) => {
    const id = req.params.id
    console.log(id)
    upload(req, res, function (err) {
        console.log("here")
        if (err instanceof multer.MulterError) {
            // console.log("here")
            res.status(201).json({ success: false, msg: "error" })
        }
        else if (err) {
            res.status(201).json({ success: false, msg: "not gonna happen" })
        }
        else {
            const id = req.params.id
            image = req.file.filename
            product.updateOne({ _id: id }, { image: image }).then(function () {
                res.status(200).json({ success: true, msg: "Done" })
            }).catch(function (e) {
                res.status(201).json({ success: false, msg: "not register" })
            })
        }
    })
})


router.get('/get/products',
    (req, res) => {
        product.find().then(function (data) {
            // console.log(here)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {
            console.log("here")
            res.status(201).json({ success: false, msg: "Some Error Occurs" })
        })
    })


router.post('/upload/product/with/file',
    [
        //check('file', "please select the file").not().isEmpty(),
        // check('level', "please enter level").not().isEmpty(),
        // check('subject', "please enter subject").not().isEmpty(),
        // check('topic', "please enter topic").not().isEmpty(),
        // check('userId', "UserID is needed").not().isEmpty()
    ], auth.varifyUser, (req, res) => {
        const errors = validationResult(req);
        console.log(req.body);
        if (errors.isEmpty()) {
            upload(req, res, function (err) {

                if (err instanceof multer.MulterError) {
                    // A Multer error occurred when uploading.
                    res.status(201).json({ success: false, msg: "error" })
                }
                else if (err) {

                    res.status(201).json({ success: false, msg: "not gonna happen" })
                }
                else {
                    var post_data = req.body;
                    var image = req.file.filename;
                    console.log(post_data)
                    var price = post_data.price;
                    var location = post_data.location;
                    var phNo = post_data.phNo;
                    var area = post_data.area;
                    var userId = post_data.userId
                    var data = new product({ image: image, price: price, location: location, phNo: phNo, area: area, userId: userId })
                    data.save().then(function (data) {
                        res.status(200).json({ success: true, msg: "product Successfully!!", id: data._id })
                    }).catch(function (e) {
                        console.log("here")
                        res.status(201).json({ success: false, msg: "Some Error Occurs" })
                    })
                }
            })
        }
        else {
            console.log(errors)
            res.status(201).json({ success: false, msg: "error" })
        }
    }
)


router.put('/Update/product',
    auth.varifyUser,
    (req, res) => {
        // console.log("here")
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                res.status(201).json({ success: false, msg: "error" })
            }
            else if (err) {

                res.status(201).json({ success: false, msg: "not gonna happen" })
            }
            else {
                var post_data = req.body;
                const id = post_data.id
                var image = req.file.filename;
                console.log(image)
                var price = post_data.price;
                var location = post_data.location;
                var phNo = post_data.phNo;
                var area = post_data.area;
                var userId = post_data.userId
                product.updateOne({ _id: id }, { image: image, price: price, location: location, phNo: phNo, area: area, userId: userId }).then(function (data) {
                    console.log(data)
                    res.status(200).json({ success: true, data: data })
                }).catch(function (e) {
                    console.log("here")
                    res.status(201).json({ success: false, msg: "Some Error Occurs" })
                })
            }
        })
    })



    
module.exports = router;