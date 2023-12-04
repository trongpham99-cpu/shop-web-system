const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'cart'
const COLLECTION_NAME = 'carts'

var cartSchema = new Schema({
    cart_state: {
        type: String,
        required: true,
        enum: ['active', 'completed', 'failed', 'pending'],
        default: 'active'
    },
    cart_products: {
        type: Array,
        required: true,
        default: []
    },
    cart_count_products: {
        type: Number,
        required: true,
        default: 0
    },
    cart_userId: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = {
    cart: model(DOCUMENT_NAME, cartSchema),
}