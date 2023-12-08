const AccessService = require('../services/access.service')
const { CREATED, OK, SuccessResponse } = require('../core/success.response')

class AccessController {
    login = async (req, res, next) => {
        new SuccessResponse({
            message: 'Login User Success',
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

    signUp = async (req, res, next) => {
        new CREATED({
            message: 'Register User Success',
            metadata: await AccessService.signUp(req.body)
        }).send(res)
    }

    getAllUser = async (req, res, next) => {
        new OK({
            message: 'Get All User Success',
            metadata: await AccessService.getAllUser()
        }).send(res)
    }

    getUser = async (req, res, next) => {
        new OK({
            message: 'Get User Success',
            metadata: await AccessService.getUserById(req.params.id)
        }).send(res)
    }

    updateUser = async (req, res, next) => {
        new OK({
            message: 'Update User Success',
            metadata: await AccessService.updateUserById(req.params.id, req.body)
        }).send(res)
    }

    deleteUser = async (req, res, next) => {
        new OK({
            message: 'Delete User Success',
            metadata: await AccessService.deleteUserById(req.params.id)
        }).send(res)
    }
}

module.exports = new AccessController()