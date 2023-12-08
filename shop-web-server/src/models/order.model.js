const { Schema, model, Types } = require('mongoose');

const DOCUMENT_NAME = 'order'
const COLLECTION_NAME = 'orders'

var orderSchema = new Schema({
    order_userId: {
        type: Types.ObjectId,
        required: true,
        ref: 'user'
    },
    order_checkout: {
        type: Object,
        default: {}
    },
    /**
     * order_checkout: {
     *  totalPrice,
     *  totalApplyDiscount,
     *  feeShip,
     * }
     */
    order_shipping: {
        type: Object,
        default: {}
    },
    order_payment: {
        type: Object,
        default: {}
    },
    order_products: {
        type: Array,
        required: true,
    },
    order_trackingNumber: {
        type: String,
        default: '#0000118052022'
    },
    order_status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'processing', 'shipping', 'completed', 'cancelled']
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = {
    order: model(DOCUMENT_NAME, orderSchema),
}