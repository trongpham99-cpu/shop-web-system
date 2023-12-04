const express = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../helpers/asyncHandler')
const { authentication } = require('../../auth/authUtils')
const router = express.Router()

router.post('/login', asyncHandler(accessController.login))
router.post('/signup', asyncHandler(accessController.signUp))

router.use(authentication)

module.exports = router