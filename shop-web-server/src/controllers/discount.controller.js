const DiscountService = require('../services/discount.service')
const { CREATED, OK, SuccessResponse } = require('../core/success.response')

class DiscountController {

    createDiscountCode = async (req, res, next) => {
        new CREATED({
            message: 'Create Discount Code Success',
            metadata: await DiscountService.createDiscountCode({
                ...req.body,
                shopId: req.user.userId
            })
        }).send(res)
    }

    getAllDiscountCodes = async (req, res, next) => {
        new OK({
            message: 'Get All Discount Codes Success',
            metadata: await DiscountService.getAllDiscountCodesByShop({
                ...req.query,
                shopId: req.user.userId
            })
        }).send(res)
    }

    getDiscountAmount = async (req, res, next) => {
        new OK({
            message: 'Get Discount Amount Success',
            metadata: await DiscountService.getDiscountAmount({
                ...req.body
            })
        }).send(res)
    }

    getAllDiscountCodesWithProduct = async (req, res, next) => {
        new OK({
            message: 'Get All Discount Codes Success',
            metadata: await DiscountService.getAllDiscountCodesWithProduct({
                ...req.query,
            })
        }).send(res)
    }

}

module.exports = new DiscountController()