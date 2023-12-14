const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { createTokenPair, verifyJWT } = require('../auth/authUtils')
const { getInfoData } = require('../utils')
const { BadRequestError } = require('../core/error.response')
const { findByEmail } = require('./user.service')

class AccessService {

    static login = async ({ email, password }) => {
        const foundUser = await findByEmail({ email })
        if (!foundUser) {
            throw new BadRequestError('Error: User not found !')
        }

        const isMatch = await bcrypt.compare(password, foundUser.password)
        if (!isMatch) {
            throw new BadRequestError('Error: Password is incorrect !')
        }

        const { _id: userId } = foundUser;
        const tokens = await createTokenPair({ userId: userId })

        return {
            shop: getInfoData({ fields: ['_id', 'name', 'email', 'roles'], object: foundUser }),
            tokens
        }
    }

    static signUp = async ({ name, email, password, address }) => {
        const holderShop = await userModel.findOne({ email }).lean()
        if (holderShop) {
            throw new BadRequestError('Error: Account already exists !')
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            address, name, email, password: passwordHash
        })

        if (newUser) {
            return {
                shop: getInfoData({ fields: ['_id', 'name', 'email', 'address'], object: newUser }),
            }
        }

        return null
    }

    static getAllUser = async () => {
        const users = await userModel.find().lean()
        return users
    }

    static getUserById = async (userId) => {
        const user = await userModel.findById(userId).lean()
        return user
    }

    static updateUserById = async (userId, data) => {
        const newUser = await userModel.findByIdAndUpdate(userId, data, { new: true }).lean()
    }

    static deleteUserById = async (userId) => {
        const user = await userModel.findByIdAndDelete(userId).lean()
        return user
    }

}

module.exports = AccessService