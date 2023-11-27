const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types


const cartSchema = new mongoose.Schema({
    product: 
        {
            type: ObjectId,
            ref: "SellerProductModel"
        }
    ,

    quantity: {
        type: Number,
        default: 1
    },

    author: {
        type: ObjectId,
        ref: "CustomerModel"
    }
});

mongoose.model("CartModel", cartSchema);