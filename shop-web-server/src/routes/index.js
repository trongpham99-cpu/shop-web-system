const express = require('express')
const router = express.Router()

router.use('/v1/api/inventory', require('./inventory'))
router.use('/v1/api/checkout', require('./checkout'))
router.use('/v1/api/cart', require('./cart'))
router.use('/v1/api/discount', require('./discount'))
router.use('/v1/api/product', require('./product'))
router.use('/v1/api', require('./access'))

module.exports = router