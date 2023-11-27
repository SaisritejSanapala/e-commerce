const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const SellerProductModel = mongoose.model("SellerProductModel");
const protectedRoute = require("../middleware/sellerProtectedResource");
const protectedRouteCustomer = require('../middleware/customerProtectedResource')


//to create product
router.post("/api/createproduct", protectedRoute, (req, res) => {
    const { image, productName, price, brand, description } = req.body;
    if (!image || !productName || !price || !brand || !description) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    req.user.password = undefined;
    const productObj = new SellerProductModel({ image: image, productName: productName, price: price, brand: brand, description: description, author: req.user });
    productObj.save()
        .then((newProduct) => {
            res.status(201).json({ product: newProduct });
        })
        .catch((error) => {
            res.json({err: error});
        })
});

//to edit product
router.post("/api/editproduct", protectedRoute, (req, res) => {
    const { image, productName, price, brand, description, id } = req.body;
    console.log(id)

    req.user.password = undefined;
     SellerProductModel.findByIdAndUpdate(id, {image: image, productName: productName, price: price, brand: brand, description: description})
     .exec()
     .then((result) => {res.status(201).json({result: result})})
     .catch((err) => {console.log(err)})
});

//to get all products
router.get('/api/myallproducts', protectedRoute, (req, res) => {
    SellerProductModel.find({ author: req.user._id })
        .populate("author", '_id fullName profileImg')
        .then((dbProducts) => {
            res.status(200).json({ products: dbProducts })
        })
        .catch((error) => {
            res.json({err: error});
        })
})


router.get("/api/allproducts", (req, res) => {
    SellerProductModel.find()
        .populate("author", "_id fullName email")
        .populate("reviews.reviewedBy", "_id fullName")
        .then((dbProducts) => {
            res.status(200).json({ products: dbProducts })
        })
        .catch((error) => {
            res.json({err: error});
        })
});


router.post("/api/productdetails", (req, res) => {
    const { productId } = req.body

    SellerProductModel.find({ _id: productId })
        .populate("author", "_id fullName email")
        .populate("reviews.reviewedBy", "_id fullName")
        .then((dbProduct) => {

            res.status(200).json({ product: dbProduct })
        })
        .catch((error) => {
            res.json({err: error});
        })
});

//to add reviews

router.post('/api/addreviews', protectedRouteCustomer, (req, res) => {
    const { productId, rating, reviewText } = req.body
    const review = { reviewText: reviewText, reviewedBy: req.user._id }
    SellerProductModel.findByIdAndUpdate(productId, {
        $push: { reviews: review, ratings: rating }
    }, {
        new: true
    })

        .then((product) => {
            res.json({ "product": product })

        }).catch((err) => {
            res.json({err: err});
        })

})


module.exports = router;