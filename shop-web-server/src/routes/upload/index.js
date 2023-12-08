const express = require('express')
const uploadController = require('../../controllers/upload.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const { upload } = require('../../middlewares/storage')
const router = express.Router()

router.use(authentication)

router.post('/single', upload.single('image'), asyncHandler(uploadController.uploadImage))
router.post('/multiple', upload.array('images'), asyncHandler(uploadController.uploadImages))

module.exports = router