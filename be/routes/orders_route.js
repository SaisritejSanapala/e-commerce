const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const OrdersModel = mongoose.model("OrdersModel");
const CartModel = mongoose.model("CartModel");
const protectedRoute = require('../middleware/customerProtectedResource')
const AddressModel = mongoose.model("AddressModel")


//to checkout
router.post("/api/checkout", protectedRoute, (req, res) => {

    CartModel.find({})
        .populate("product", "_id")
        .then((cartItems) => {
            for (let item of cartItems) {
                const orderObj = new OrdersModel({ product: item.product._id, quantity: item.quantity })
                orderObj.save()
            }
            res.json({ "result": "order placed" })
        })

        .catch((err) => {
            res.json({ err: err })
        })
})


router.post("/api/orderaddress", protectedRoute, (req, res) => {
    const { addressId, orderId } = req.body;

    OrdersModel.findByIdAndUpdate(orderId, {
        shipping: addressId
    }).populate("shipping", "address city fullName state zipCode")
        .exec()
        .then((result) => { res.json({ result: result }) })
        .catch((err) => { res.json({ err: err }) })

})


router.get('/api/orderdetails', (req, res) => {
    OrdersModel.find({})
        .populate("product", "_id image productName quantity price")
        .then((items) => {
            res.json({ items: items })
        })
        .catch((err) => { res.json({ err: err }) })
})
module.exports = router