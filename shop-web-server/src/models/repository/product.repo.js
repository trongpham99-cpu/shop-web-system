const { product, clothing, electronic } = require('../../models/product.model');
const { Types } = require('mongoose');
const { getSelectData, getUnselectData } = require('../../utils');
const findAllDraftsForShop = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip });
}

const findAllProducts = async ({ limit, sort, page, filter, select }) => {
    const skip = (page - 1) * limit;
    const sortBy = sort === 'ctime' ? { _id: -1 } : { _id: 1 };
    const products = await product.find(filter)
        .sort(sortBy)
        .skip(skip)
        .limit(limit)
        .select(getSelectData(select))
        .lean()
        .exec();

    return products;
}

const findProduct = async ({ product_id, unSelect }) => {
    const productFound = await product.findById(product_id)
        .select(getUnselectData(unSelect))
        .lean()
        .exec();

    return productFound;
}

const updateProductById = async ({ product_id, payload, model, isNew = true }) => {
    return await model.findOneAndUpdate(
        { _id: product_id },
        payload,
        { new: isNew }
    ).lean().exec();
}

const findAllPublishForShop = async ({ query, limit, skip }) => {
    return await queryProduct({ query, limit, skip });
}

const searchProductByUser = async ({ keyword }) => {
    const regexSearch = new RegExp(keyword);
    const result = await product.find(
        {
            isPublished: true,
            $text: {
                $search: regexSearch
            },
        },
        {
            score: { $meta: "textScore" }
        }
    )
        .sort({ score: { $meta: "textScore" } })
        .lean()
        .exec();

    return result;
}

const publishProductByShop = async ({ product_id, product_shop }) => {
    const foundProduct = await product.findOne(
        {
            _id: new Types.ObjectId(product_id),
            product_shop: new Types.ObjectId(product_shop),
            isDraft: true
        }
    ).lean().exec();

    if (!foundProduct) return null;

    foundProduct.isDraft = false;
    foundProduct.isPublished = true;
    const productUpdated = await product.findOneAndUpdate(
        {
            _id: new Types.ObjectId(product_id),
            product_shop: new Types.ObjectId(product_shop),
            isDraft: true
        },
        foundProduct,
        { new: true }
    ).lean().exec();

    return productUpdated;
}

const unpublishProductByShop = async ({ product_id, product_shop }) => {
    const foundProduct = await product.findOne(
        {
            _id: new Types.ObjectId(product_id),
            product_shop: new Types.ObjectId(product_shop),
            isPublished: true
        }
    ).lean().exec();

    if (!foundProduct) return null;

    foundProduct.isDraft = true;
    foundProduct.isPublished = false;
    const productUpdated = await product.findOneAndUpdate(
        {
            _id: new Types.ObjectId(product_id),
            product_shop: new Types.ObjectId(product_shop),
            isPublished: true
        },
        foundProduct,
        { new: true }
    ).lean().exec();

    return productUpdated;
}

const queryProduct = async ({ query, limit, skip }) => {
    return await product.find(query).
        populate('product_shop', 'name email -_id').
        sort({ createdAt: -1 }).
        skip(skip).
        limit(limit).
        lean().
        exec();
}

const getProductById = async (product_id) => {
    return await product.findById(product_id).lean().exec();
}

const checkProductByServer = async (products) => {
    return await Promise.all(products.map(async (product) => {
        const foundProduct = getProductById(product.productId);
        if (foundProduct) {
            return {
                price: product.price,
                quantity: product.quantity,
                productId: product.productId
            }
        }
    }))
}

module.exports = {
    findAllDraftsForShop,
    publishProductByShop,
    findAllPublishForShop,
    unpublishProductByShop,
    searchProductByUser,
    findAllProducts,
    findProduct,
    updateProductById,
    getProductById,
    checkProductByServer
}