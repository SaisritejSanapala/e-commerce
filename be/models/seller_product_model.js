const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types

const sellerProductSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    ratings: [
        {
            type: Number

        }
    ],
    reviews: [
        {
            reviewText: String,
            reviewedBy: { type: ObjectId, ref: "CustomerModel" }
        }
    ],
    description: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: "SellerModel"
    }

});

mongoose.model("SellerProductModel", sellerProductSchema);