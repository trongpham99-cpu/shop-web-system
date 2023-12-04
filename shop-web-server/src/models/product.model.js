const { Schema, model } = require('mongoose');
const slugify = require('slugify');
const DOCUMENT_NAME = 'product'
const COLLECTION_NAME = 'products'

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    product_thumb: {
        type: String,
        required: true
    },
    product_description: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    },
    product_slug: {
        type: String,
    },
    product_type: {
        type: String,
        required: true
    },
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'shop',
        required: true
    },
    product_attributes: {
        type: Schema.Types.Mixed,
        required: true
    },
    //more
    product_ratingAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: val => Math.round(val * 10) / 10 //4.666666, 46.66666, 47, 4.7
    },
    product_variations: {
        type: Array,
        default: []
    },
    isDraft: {
        type: Boolean,
        default: true,
        index: true,
        select: false
    },
    isPublished: {
        type: Boolean,
        default: false,
        index: false,
        select: false
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});
// Indexes
productSchema.index({ product_name: 'text', product_description: 'text' });
// Document middlewares
productSchema.pre('save', function (next) {
    this.product_slug = slugify(this.product_name, { lower: true });
    next();
});

const clothingSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'shop',
        required: true
    },
}, {
    timestamps: true,
    collection: 'clothes'
});

const electronicSchema = new Schema({
    manufacturer: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    product_shop: {
        type: Schema.Types.ObjectId,
        ref: 'shop',
        required: true
    },
}, {
    timestamps: true,
    collection: 'electronics'
});

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    clothing: model('clothing', clothingSchema),
    electronic: model('electronic', electronicSchema)
}