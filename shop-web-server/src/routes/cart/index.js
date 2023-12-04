const express = require('express')
const cartController = require('../../controllers/cart.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

router.use(authentication)

router.post('', asyncHandler(cartController.addToCart))
router.post('/update', asyncHandler(cartController.update))
router.post('', asyncHandler(cartController.delete))
router.get('', asyncHandler(cartController.listToCart))

module.exports = router