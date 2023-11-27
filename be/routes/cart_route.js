const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const CartModel = mongoose.model("CartModel");

const protectedRoute = require('../middleware/customerProtectedResource')

//to add items
router.post('/api/additem', protectedRoute, (req, res) => {
    const { productId, customerId } = req.body

    CartModel.findOne({ product: productId })
        .then((cartItem) => {
            if (cartItem) {

                cartItem.quantity += 1;
                cartItem.save()
                    .then(() => {
                        res.json({ message: 'Item quantity updated in the cart' });
                    })
                    .catch((err) => {
                        res.status(500).json({ error: err.message });
                    });
            } else {

                const cartItem = new CartModel({ product: productId, author: customerId });
                cartItem.save()
                    .then(() => {
                        res.json({ message: 'Item added to the cart' });
                    })
                    .catch((err) => {
                        res.status(500).json({ error: err.message });
                    });
            }
        })
        .catch((err) => {
            res.status(500).json({ error: "Item not in stock" });
        });
})

//to get cart items

router.get('/api/getcartitems', protectedRoute, (req, res) => {
    CartModel.find({})
        .populate("author", "_id fullName profileImg")
        .populate("product", "image productName price brand ratings reviews")
        .then((cartItems) => {
            res.status(200).json({ cartItems: cartItems })
        })
        .catch((err) => {
            res.json({err: err});
        })

})


//to increase quantity

router.put('/api/increase', protectedRoute, (req, res) => {

    CartModel.findOne({ _id: req.body.cartItemId })
        .then((cartItem) => {
            cartItem.quantity += 1;
            cartItem.save()
                .then(() => {
                    res.json({ message: 'Item quantity updated in the cart' });
                })
                .catch((err) => {
                    res.status(500).json({ error: err.message });
                });
        })
        .catch((err) => {
            console.log(err)
        })

})

//to decrease quantity

router.put('/api/decrease', protectedRoute, (req, res) => {

    CartModel.findOne({ _id: req.body.cartItemId })
        .then((cartItem) => {
            if (cartItem.quantity !== 0) {
                cartItem.quantity -= 1;
                cartItem.save()
                    .then(() => {
                        res.json({ message: 'Item quantity updated in the cart' });
                    })
                    .catch((err) => {
                        res.status(500).json({ error: err.message });
                    });
            }

        })
        .catch((err) => {
            console.log(err)
        })
})

router.delete('/api/deletecartitem/:id', protectedRoute, (req, res) => {
    const cartItemId = req.params.id;

    CartModel.findByIdAndRemove(cartItemId)
        .then(() => {
            res.json({ message: 'Item removed from the cart' });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});


module.exports = router;