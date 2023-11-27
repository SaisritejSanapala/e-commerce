const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const AddressModel = mongoose.model("AddressModel");
const protectedRoute = require('../middleware/customerProtectedResource')


router.post('/api/addaddress', protectedRoute, (req, res) => {
    
    const { address, city, fullName, state, zipCode } = req.body
    if (!address || !city || !fullName || !state || !zipCode) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    req.user.password = undefined;
    const addressObj = new AddressModel({ address, city, fullName, state, zipCode })
    addressObj.save()
        .then((newAddress) => {
            res.status(201).json({ address: newAddress })
        }) 
        .catch((err) => {
            res.json({err: error});
        })

})

module.exports = router
