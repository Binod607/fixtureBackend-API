const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const upload = require('../middleware/upload')
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const saltRounds = 10
const User = require('../Models/User')
const multer = require('multer')
const auth = require('../middleware/auth')

//creating user user routes
router.post('/insert',
    [
        check('name', "Name must be filled").not().isEmpty(),
        check('email', 'Enter a valid email').isEmail(),
        check('password', 'Password must be 5 latter long').isLength({ min: 5 })
    ],
    (req, res) => {
        const errors = validationResult(req)
        if (errors.isEmpty) {
            var data = req.body;
            var name = data.name;
            var address = data.address;
            var email = data.email;
            var role = "User";
            var password = data.password;
            const hash = bcrypt.hashSync(password, saltRounds);
            var data1 = new User({ name: name, address: address, email: email, password: hash, role: role })
            console.log(data1)
            data1.save().then(function (data) {
                console.log(data._id)
                res.status(201).json({ success: true, msg: "Success" })
            }).catch(function (e) {
                //.send(e)
                res.status(201).json({ success: false, msg: "something went wrong" })
                //console.log(e)
            })
        }
        else {
            res.status(201).json({ success: false, msg: "error" })
            // console.log(errors.array())
            // res.send(errors.array())
        }
    })

router.post('/user/login', (req, res) => {
    const body = req.body;
    User.findOne({ email: body.email }).then(function (userData) {
        if (userData == null) {
            console.log("HERE")
            return res.status(201).json({ success: false, msg: "Invalid User!!" })
        }
        bcrypt.compare(body.password, userData.password, function (err, results) {
            console.log(results)
            if (results == false) {
                console.log("hereasa")
                return res.status(201).json({ success: false, msg: "Invalid User!" })
            }
            User.find({ email: req.body.email }).then(function (data) {
                const token = jwt.sign({ userId: userData._id }, 'secretkey');
                console.log(data)
                res.status(200).json({ success: true, msg: "Login Successfull", token: token, data: data, id: userData._id })
            }).catch(function (e) {

            })
        })

    }).catch(function (e) {
        res.status(500).json({ success: false, msg: e })
    })
})


router.get('/get/me/:id',
    auth.varifyUser,
    (req, res) => {
        const id = req.params.id
        console.log(id)
        User.find({ _id: id }).then(function (data) {
            // console.log(data)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {
            res.status(200).json({ success: false, msg: e })
        })
    })


// yo check grnu xa haiii vaxaenaw  
router.put('/Userupdate/:UserID',
    auth.varifyUser,
    auth.varifyAdminorUser, (req, res) => {
        const id = req.params.UserID
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password
        User.updateMany([{ _id: id }, { name: name }, { email: email }, { password: password }]).then(function () {
            res.status(200).json({ success: true, msg: "Update Successfull" })
        }).catch(function (e) {
            res.status(400).json({ success: true, msg: e })
        })
    })
router.get('/get/me/web/:id',
    auth.varifyUser,
    (req, res) => {
        const id = req.params.id
        // console.log(id)
        User.findOne({ _id: id }).then(function (data) {
            console.log(data)
            res.status(200).json({ success: true, data: data })
        }).catch(function (e) {
            res.status(200).json({ success: false, msg: e })
        })
    })

router.put('/user/update/web',
    auth.varifyUser,
    (req, res) => {
        upload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log("here")
                res.status(201).json({ success: false, msg: "error" })
            }
            else if (err) {
                res.status(201).json({ success: false, msg: "not gonna happen" })
            }
            else {
                //console.log(req.body)
                const id = req.body.id
                console.log(req.body)
                const name = req.body.name;
                const email = req.body.email;
                const address = req.body.address
                var password = req.body.password
                var image = req.file.filename
                //console.log(image)
                const hash = bcrypt.hashSync(password, saltRounds);
                User.updateOne({ _id: id }, { name: name, email: email, address: address, password: hash, image: image }).then(function (data) {
                    console.log(data)
                    res.status(200).json({ success: true, msg: "Update Successfull", data: data })
                    // console.log("here nigga")
                }).catch(function (e) {
                    res.status(201).json({ success: true, msg: "error here" })
                })
            }
        })
    })

router.put("/user/img/image/:id", auth.varifyUser, (req, res) => {
    const id = req.params.id
    console.log("here")
    upload(req, res, function (err) {
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
            console.log(image)
            User.updateOne({ _id: id }, { image: image }).then(function () {
                res.status(200).json({ success: true, msg: "Done" })
            }).catch(function (e) {
                res.status(201).json({ success: false, msg: "not register" })
            })
        }
    })
})

router.put('/android/user/update',
    auth.varifyUser,
    (req, res) => {
        console.log(req.body)
        const id = req.body._id
        console.log(id)
        const address=req.body.address
        const name = req.body.name;
        const email = req.body.email;
        var password = req.body.password
        var image = "noimg"
        console.log(image + name + email + password)
        const hash = bcrypt.hashSync(password, saltRounds);
        User.updateOne({ _id: id }, { name: name, email: email, password: hash, image: image,address:address }).then(function (data) {
            console.log(data)
            res.status(200).json({ success: true, msg: "Update Successfull" })
            // console.log("here nigga")
        }).catch(function (e) {
            res.status(201).json({ success: true, msg: "error here" })
        })

    })
module.exports = router