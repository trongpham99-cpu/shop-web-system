const { Schema, model } = require('mongoose');

const DOCUMENT_NAME = 'user'
const COLLECTION_NAME = 'users'

const userSchema = new Schema({
    name: {
        type: String,
        index: true,
        trim: true,
        maxLength: 150
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        default: "unknown"
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    roles: {
        type: Array,
        default: ["user"]
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

module.exports = model(DOCUMENT_NAME, userSchema);