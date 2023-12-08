const { NotFoundError } = require('../core/error.response');
const { cart } = require('../models/cart.model');
const { getProductById } = require('../models/repository/product.repo');
class CartService {

    static async createUserCart({ userId, product }) {
        const query = {
            cart_userId: userId,
            cart_state: 'active'
        }
        const updateOrInsert = {
            cart_products: product
        }
        const options = {
            upsert: true,
            new: true,
        }

        return cart.findOneAndUpdate(query, updateOrInsert, options);
    }

    static async updateUserCartQuantity({ userId, product }) {
        const { productId, quantity } = product;
        console.log('dev:::::', { userId, productId, quantity })
        const query = {
            cart_userId: userId,
            'cart_products.productId': productId,
            cart_state: 'active'
        }, updateSet = {
            $inc: {
                'cart_products.$.quantity': quantity
            }
        }, options = {
            upsert: true,
            new: true,
        }

        return cart.findOneAndUpdate(query, updateSet, options);
    }

    static async addToCart({ userId, product = {}, }) {
        const userCart = await cart.findOne({ cart_userId: userId });

        if (!userCart) {
            return await CartService.createUserCart({ userId, product });
        }

        if (!userCart.cart_products.length) {
            userCart.cart_products = [product];
            return await userCart.save();
        }

        return await CartService.updateUserCartQuantity({ userId, product });
    }

    static async addToCartV2({ userId, shop_order_ids }) {
        const { productId, quantity, old_quantity } = shop_order_ids[0]?.item_products[0];
        console.log('dev:::::', { productId, quantity, old_quantity })
        const foundProduct = await getProductById(productId);
        if (!foundProduct) throw new NotFoundError('Product not found');

        if (foundProduct.userId.toString() !== shop_order_ids[0]?.shopId) {
            throw new BadRequestError('Product do not belong to this shop');
        }

        if (quantity === 0) {
            return await CartService.deleteUserCart({ userId, productId });
        }

        const newQuantity = quantity - old_quantity;
        console.log('dev:::::', { newQuantity })

        return await CartService.updateUserCartQuantity({
            userId,
            product: {
                productId,
                quantity: newQuantity
            }
        })

    }

    static async deleteUserCart({ userId, productId }) {
        const query = {
            cart_userId: userId,
            cart_state: 'active'
        },
            updateSet = {
                $pull: {
                    cart_products: {
                        productId
                    }
                }
            }

        const deleteCart = await cart.updateOne(query, updateSet);

        return deleteCart;
    }

    static async getListUserCart({ userId }) {
        return await cart.findOne({
            cart_userId: +userId
        }).lean().exec();
    }

}

module.exports = CartService;