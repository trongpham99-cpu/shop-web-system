const express = require('express')
const productController = require('../../controllers/product.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const { upload } = require('../../middlewares/storage')
const router = express.Router()

//query
router.get('', asyncHandler(productController.findAllProducts))
router.get('/search', asyncHandler(productController.getListSearchProduct))
router.get('/:id', asyncHandler(productController.findProduct))

router.use(authentication)

router.post('', upload.single('file'), asyncHandler(productController.createProduct))
router.post('/publish/:id', asyncHandler(productController.publishProductByShop))
router.post('/publish-all', asyncHandler(productController.publishAllProductByShop))
router.post('/unpublish/:id', asyncHandler(productController.unpublishProductByShop))
router.patch('/:id', asyncHandler(productController.updateProduct))

//query//
router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop))
router.get('/published/all', asyncHandler(productController.getAllPublishedForShop))
router.get('/admin/all', asyncHandler(productController.getAllProductsForAdmin))

module.exports = router