const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
    cloud_name: "dblpwxmnh",
    api_key: "132635623228588",
    api_secret: "zKL9yMEaoZfV2fghdY6X6-pxdvo"
});

const uploadSingleImage = async (fileString) => {
    const file = path.resolve(__dirname, `../../src/public/images/${fileString}`);
    console.log(file)
    try {
        const result = await cloudinary.uploader.upload(file);
        return result;
    } catch (err) {
        console.log(err)
    }
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