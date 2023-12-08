const { findCartById } = require("../models/repository/cart.repo");
const { BadRequestError } = require('../core/error.response');
const { checkProductByServer } = require("../models/repository/product.repo");
const { getDiscountAmount } = require("./discount.service");
const { acquireLock, releaseLock } = require("./redis.service");
const { order } = require("../models/order.model");

class CheckoutService {
    /*
        {
            cartId: 1,
            userId: 1,
            shop_order_ids: [
                {
                    shopId: 1,
                    shop_discounts: [
                        {
                            shopId,
                            discountId,
                            codeId
                            
                        }
                    ],
                    item_products: [
                        {
                            price,
                            quantity,
                            productId
                        }
                    ]
                }
            ]
        }
    */
    static async checkoutReview({
        cartId, userId, shop_order_ids
    }) {
        const foundCart = await findCartById(cartId);
        if (!foundCart) {
            throw new BadRequestError('Cart not found')
        }

        const checkout_order = {
            totalPrice: 0,
            feeShip: 0,
            totalDiscount: 0,
            totalCheckout: 0,
        };
        const shop_order_ids_new = [];

        for (let i = 0; i < shop_order_ids.length; i++) {
            const { shopId, shop_discounts = [], item_products = [] } = shop_order_ids[i];
            const checkProductServer = await checkProductByServer(item_products);
            console.log(`checkProductServer`, checkProductServer)
            if (!checkProductByServer[0]) {
                throw new BadRequestError('order wrong !!!')
            }

            const checkoutPrice = checkProductServer.reduce((acc, cur) => {
                return acc + (cur.price * cur.quantity)
            }, 0);

            checkout_order.totalPrice = + checkoutPrice;

            const itemCheckout = {
                shopId,
                shop_discounts,
                priceRaw: checkoutPrice,
                priceApplyDiscount: checkoutPrice,
                item_products: checkProductServer
            }

            if (shop_discounts.length > 0) {
                const { totalPrice = 0, discount = 0 } = await getDiscountAmount({
                    codeId: shop_discounts[0].codeId,
                    userId,
                    shopId,
                    products: checkProductServer
                })

                checkout_order.totalDiscount += discount;

                if (discount > 0) {
                    itemCheckout.priceApplyDiscount = checkoutPrice - discount;
                }
            }

            checkout_order.totalCheckout += itemCheckout.priceApplyDiscount;
            shop_order_ids_new.push(itemCheckout);
        }

        return {
            checkout_order,
            shop_order_ids_new,
            checkout_order
        }

    }

    //order
    static async orderByUser({
        shop_order_ids,
        cartId,
        userId,
        user_address = {},
        user_payment = {}
    }) {
        const { shop_order_ids_new, checkout_order } = await this.checkoutReview({
            cartId: cartId,
            userId,
            shop_order_ids
        });

        const products = shop_order_ids_new.flatMap(order => order.item_products);
        const acquireProducts = [];
        for (let i = 0; i < products.length; i++) {
            const { productId, quantity } = products[i];
            const keyLock = await acquireLock(productId, quantity, cartId);
            acquireProducts.push(keyLock ? true : false);

            if (keyLock) {
                await releaseLock(keyLock);
            }
        }

        if (acquireProducts.includes(false)) {
            throw new BadRequestError('Product not enough')
        }

        const newOrder = await order.create({
            order_userId: userId,
            order_checkout: checkout_order,
            order_shipping: user_address,
            order_payment: user_payment,
            order_products: shop_order_ids_new
        })

        if (newOrder) {
            //remove product in cart
        }

        return newOrder;
    }

    static async getOrdersByUser() {

    }

    static async getOneOrderByUser() {

    }

    static async cancelOrderByUser() {

    }

    static async updateOrderStatusByShop() {

    }

    static async getDetailOrder(id) {
        const orderDetail = await order.findById(id);
        return orderDetail;
    }

    static async getOrders({ filter = {
        status: '',
        fromDate: '',
        toDate: ''
    } }) {
        const { status, fromDate, toDate } = filter;
        const query = {};

        if (status) {
            query.order_status = status;
        }

        if (fromDate && toDate) {
            query.createdAt = {
                $gte: fromDate,
                $lte: toDate
            }
        }

        const orders = await order.find(query).sort({ createdAt: -1 }).populate('order_userId');
        return orders;
    }

    static async myOrder({ userId }) {
        const orders = await order.find({ order_userId: userId }).sort({ createdAt: -1 });
        return orders;
    }

    static async checkout({ carts, deliveryInformation, _id }) {
        let totalPrice = 0;
        carts.forEach((cart) => {
            totalPrice += cart.price * cart.quantity;
        });

        const newOrder = {
            order_userId: _id,
            order_checkout: {
                totalPrice: totalPrice,
            },
            order_shipping: {
                ...deliveryInformation
            },
            order_payment: {},
            order_products: carts,
            order_trackingNumber: '#0000118052022',
            order_status: 'pending'
        }

        const res = await order.create(newOrder);
        return res;
    }
}

module.exports = CheckoutService;