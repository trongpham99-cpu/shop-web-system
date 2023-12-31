const JWT = require('jsonwebtoken')
const { asyncHandler } = require('../helpers/asyncHandler')
const { HEADER } = require('../_const')
const { BadRequestError, NotFoundError } = require('../core/error.response')
const { findUserById } = require('../services/user.service')

const createTokenPair = async (payload) => {
    try {
        const accessToken = await JWT.sign(payload, "my-secret-key", {
            expiresIn: '2 days'
        })

        const refreshToken = await JWT.sign(payload, "my-secret-key", {
            expiresIn: '30 days'
        })

        return {
            accessToken,
            refreshToken
        }
    } catch (error) {
        throw new BadRequestError('Error: Create token pair failed !')
    }
}

const authentication = asyncHandler(async (req, res, next) => {

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new BadRequestError('Error: Access Token is required !')
    try {
        const decodeUser = await JWT.verify(accessToken, "my-secret-key")
        const { userId } = decodeUser
        const userDetail = await findUserById({ userId })
        if (!userDetail) throw new NotFoundError('Error: User not found !')

        if (userDetail.status != 'active') {
            throw new BadRequestError('Error: User is not active !')
        }

        req.user = userDetail
        next()
    } catch (error) {
        throw new BadRequestError('Error: Invalid Access Token !')
    }
})

const verifyJWT = async (token, keySecret) => {
    return await JWT.verify(token, keySecret)
}

module.exports = {
    createTokenPair,
    authentication,
    verifyJWT
}