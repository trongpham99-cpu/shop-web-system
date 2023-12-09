const CheckoutService = require('../services/checkout.service');
const { SuccessResponse } = require('../core/success.response');

class checkoutController {
    checkoutReview = async (req, res, next) => {
        new SuccessResponse({
            message: 'Checkout review success',
            metadata: await CheckoutService.checkoutReview(req.body)
        }).send(res)
    }

    getDetailOrder = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get order detail success',
            metadata: await CheckoutService.getDetailOrder(req.params.orderId)
        }).send(res)
    }

    getOrders = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get orders success',
            metadata: await CheckoutService.getOrders(req.user)
        }).send(res)
    }

    myOrder = async (req, res, next) => {
        new SuccessResponse({
            message: 'My order success',
            metadata: await CheckoutService.myOrder({ userId: req.user._id })
        }).send(res)
    }

    checkout = async (req, res, next) => {
        new SuccessResponse({
            message: 'Checkout success',
            metadata: await CheckoutService.checkout({
                ...req.body,
                ...req.user
            })
        }).send(res)
    }
}

module.exports = new checkoutController()