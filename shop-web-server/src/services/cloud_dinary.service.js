const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,
    api_key: process.env.CLOUNDINARY_API_KEY,
    api_secret: process.env.CLOUNDINARY_API_SECRET
});

const uploadSingleImage = async (file) => {
    const result = await cloudinary.uploader.upload(file.path);
    return result;
}

const uploadMultipleImages = async (files) => {
    const urls = [];
    for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path);
        urls.push(result.url);
        fs.unlinkSync(file.path);
    }
    return urls;
}

module.exports = {
    uploadSingleImage,
    uploadMultipleImages
}