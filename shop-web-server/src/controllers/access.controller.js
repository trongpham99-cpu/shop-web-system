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
}

module.exports = new AccessController()