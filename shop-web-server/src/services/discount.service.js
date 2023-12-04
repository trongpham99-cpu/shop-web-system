const { BadRequestError } = require("../core/error.response");
const { discount } = require("../models/discount.model");
const { convertTypes } = require("../utils/index");
const { findAllProducts } = require("../models/repository/product.repo");
const { findAllDiscountCodesUnSelect, findAllDiscountCodesSelect, checkDiscountExists } = require("../models/repository/discount.repo");
class DiscountService {

    static async createDiscountCode(payload) {
        const {
            code, start_date, end_date, is_active,
            shopId, min_order_value, product_ids, applies_to, name,
            description, type, value, max_value, max_uses, uses_count, max_uses_per_user, users_used
        } = payload;

        // if (new Date() < new Date(start_date) || new Date() > new Date(end_date)) {
        //     throw new BadRequestError("Invalid start date or end date");
        // }

        if (new Date(start_date) > new Date(end_date)) {
            throw new BadRequestError("Start date must be less than end date");
        }

        const foundDiscount = await discount.findOne({
            discount_code: code,
            discount_shopId: convertTypes(shopId)
        }).lean();

        if (foundDiscount && foundDiscount.discount_is_active) {
            throw new BadRequestError("Discount code already exists");
        }

        const newDiscount = await discount.create({
            discount_name: name,
            discount_description: description,
            discount_type: type,
            discount_code: code,
            discount_value: value,
            discount_min_order_value: min_order_value || 0,
            discount_max_value: max_value,
            discount_start_date: new Date(start_date),
            discount_end_date: new Date(end_date),
            discount_max_uses: max_uses,
            discount_uses_count: uses_count,
            discount_users_used: users_used,
            discount_shopId: convertTypes(shopId),
            discount_max_uses_per_user: max_uses_per_user,
            discount_is_active: is_active,
            discount_applies_to: applies_to,
            discount_product_ids: applies_to === 'all' ? [] : product_ids
        });

        return newDiscount;
    }

    static async updateDiscountCode(payload) {

    }

    static async getAllDiscountCodesWithProduct({
        code, shopId, userId, limit, page
    }) {
        const foundDiscount = await discount.findOne({
            discount_code: code,
            discount_shopId: convertTypes(shopId)
        }).lean();

        if (!foundDiscount || !foundDiscount.discount_is_active) {
            throw new BadRequestError("Discount code not found");
        }

        const { discount_applies_to, discount_product_ids } = foundDiscount;
        let products = [];
        if (discount_applies_to === 'all') {
            //get all product
            products = await findAllProducts({
                filter: {
                    product_shop: convertTypes(shopId),
                    isPublished: true
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ["product_name"]
            })
        }

        if (discount_applies_to === 'specific') {
            //get specific product
            products = await findAllProducts({
                filter: {
                    _id: {
                        $in: discount_product_ids
                    },
                    isPublished: true
                },
                limit: +limit,
                page: +page,
                sort: 'ctime',
                select: ["product_name"]
            })
        }

        return products;
    }

    static async getAllDiscountCodesByShop({
        limit, page, shopId,
    }) {
        const discounts = await findAllDiscountCodesSelect({
            limit: +limit,
            page: +page,
            sort: 'ctime',
            filter: {
                discount_shopId: convertTypes(shopId),
                discount_is_active: true
            },
            select: ['discount_code', 'discount_name'],
            model: discount
        })

        return discounts;
    }

    static async getDiscountAmount({ codeId, userId, shopId, products }) {
        const foundDiscount = await checkDiscountExists({
            model: discount,
            filter: {
                discount_code: codeId,
                discount_shopId: convertTypes(shopId)
            }
        })

        if (!foundDiscount) {
            throw new BadRequestError("Discount code not found");
        }

        const { discount_is_active, discount_max_uses, discount_type, discount_value, discount_min_order_value, discount_users_used } = foundDiscount;

        if (!discount_is_active) {
            throw new BadRequestError("Discount code is not active");
        }

        if (!discount_max_uses) {
            throw new BadRequestError("Discount code is expired");
        }

        // if (new Date() < new Date(discount_start_date) || new Date() > new Date(discount_end_date)) {
        //     throw new BadRequestError("Discount code is expired");
        // }

        let totalOrder = 0;
        if (discount_min_order_value > 0) {
            totalOrder = products.reduce((acc, cur) => {
                return acc + (cur.product_price * cur.product_quantity)
            }, 0)

            if (totalOrder < discount_min_order_value) {
                throw new BadRequestError("Discount code is expired");
            }
        }

        if (discount_max_uses > 0) {
            const userUserDiscount = discount_users_used.find(user => user === userId);
            if (userUserDiscount) {
                // throw new BadRequestError("Discount code is expired");
            }
        }

        const amount = discount_type === 'fixed_amount' ? discount_value : totalOrder * (discount_value / 100);
        return {
            totalOrder,
            discount: amount,
            totalPay: totalOrder - amount
        }
    }

    static async deleteDiscountCode({ shopId, codeId }) {
        const deleted = await discount.findOneAndDelete({
            discount_code: codeId,
            discount_shopId: convertTypes(shopId)
        });

        return deleted;
    }

    static async cancelDiscountCode({ codeId, shopId, userId }) {
        const foundDiscount = await checkDiscountExists({
            model: discount,
            filter: {
                discount_code: code,
                discount_shopId: convertTypes(shopId)
            }
        })

        if (!foundDiscount) {
            throw new BadRequestError("Discount code not found");
        }

        const result = await discount.findOneAndUpdate(
            foundDiscount._id,
            {
                $pull: {
                    discount_users_used: userId
                },
                $inc: {
                    discount_max_uses: 1,
                    discount_uses_count: -1
                }
            },
        )

        return result;
    }
}

module.exports = DiscountService;