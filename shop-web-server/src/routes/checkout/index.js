const express = require('express')
const checkoutController = require('../../controllers/checkout.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

router.use(authentication)

router.post('/review', asyncHandler(checkoutController.checkoutReview))
router.post('', asyncHandler(checkoutController.checkout))
router.get('', asyncHandler(checkoutController.myOrder))
router.get('/orders', asyncHandler(checkoutController.getOrders))
router.get('/:orderId', asyncHandler(checkoutController.getDetailOrder))

module.exports = router