const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types


const OdersSchema = new mongoose.Schema({
    product:
    {
        type: ObjectId,
        ref: "SellerProductModel"
    }
    ,

    payment: {
        type: String
    },

    quantity: {
        type: String
    },

    total: {
        type: Number,
    },

    paid: {
        type: String
    },
    delivered: {
        type: String
    },

    createdAt: { type: Date, default: Date.now },

});

mongoose.model("OrdersModel", OdersSchema);