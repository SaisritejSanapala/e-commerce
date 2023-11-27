const express = require('express');
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Adminmodel = mongoose.model("AdminModel");
const { JWT_SECRET } = require('../config');

router.post("/api/adminsignup", (req, res) => {
    const { fullName, email, password, profileImg } = req.body;
    if (!fullName || !password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    Adminmodel.findOne({ email: email })
        .then((userInDB) => {
            if (userInDB) {
                return res.status(500).json({ error: "User with this email already registered" });
            }
            bcryptjs.hash(password, 16)
                .then((hashedPassword) => {
                    const user = new Adminmodel({ fullName, email, password: hashedPassword, profileImg });
                    user.save()
                        .then((newUser) => {
                            res.status(201).json({ result: "User Signed up Successfully!" });
                        })
                        .catch((err) => {
                            res.json({err: err});
                        })
                }).catch((err) => {
                    res.json({err: err});
                })
        })
        .catch((err) => {
            res.json({err: err});
        })
});

router.post("/api/adminlogin", (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    Adminmodel.findOne({ email: email })
        .then((userInDB) => {
            if (!userInDB) {
                return res.status(401).json({ error: "Invalid Credentials" });
            }
            bcryptjs.compare(password, userInDB.password)
                .then((didMatch) => {
                    if (didMatch) {
                        const jwtToken = jwt.sign({ _id: userInDB._id }, JWT_SECRET);
                        const userInfo = { "_id": userInDB._id, "email": userInDB.email, "fullName": userInDB.fullName, "profileImg": userInDB.profileImg, "type": userInDB.type};
                        res.status(200).json({ result: { token: jwtToken, user: userInfo } });
                    } else {
                        return res.status(401).json({ error: "Invalid Credentials" });
                    }
                }).catch((err) => {
                    res.json({err: err});
                })
        })
        .catch((err) => {
            res.json({err: err});
        })
});

module.exports = router;