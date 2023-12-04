const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'inventory'
const COLLECTION_NAME = 'inventories'

var inventorySchema = new Schema({
    inven_productId: { type: Schema.Types.ObjectId, ref: 'product' },
    inven_location: { type: String, default: "unKnown" },
    inven_stock: { type: Number, default: 0, required: true },
    inven_shopId: { type: Schema.Types.ObjectId, ref: 'shop' },
    inven_reservations: {
        type: Array,
        default: []
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = {
    inventory: model(DOCUMENT_NAME, inventorySchema),
}