const UploadService = require('../services/cloud_dinary.service')
const { SuccessResponse } = require('../core/success.response')

class UploadController {
    uploadImage = async (req, res, next) => {
        new SuccessResponse({
            message: 'Upload image success',
            metadata: {
                url: `http://localhost:3052/public/images/${req.file.filename}`
            }
        }).send(res)
    }

    uploadImages = async (req, res, next) => {
        new SuccessResponse({
            message: 'Upload images success',
            metadata: {
                urls: req.files.map(file => `http://localhost:3052/public/images/${file.filename}`)
            }
        }).send(res)
    }
}

module.exports = new UploadController()