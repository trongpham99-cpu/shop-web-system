const { cart } = require('../cart.model');
const { convertTypes } = require('../../utils/index');

const findCartById = async (cartId) => {
    return await cart.findOne({
        _id: convertTypes(cartId),
        cart_state: 'active'
    }).lean();
}

module.exports = {
    findCartById
}