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

const countFindAllProducts = async ({ filter }) => {
    const count = await product.find(filter).countDocuments().exec();
    return count;
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

const publishProductByShop = async ({ product_id, userId }) => {
    const foundProduct = await product.findOne(
        {
            _id: new Types.ObjectId(product_id),
            userId: new Types.ObjectId(userId),
            isDraft: true
        }
    ).lean().exec();

    if (!foundProduct) return null;

    foundProduct.isDraft = false;
    foundProduct.isPublished = true;
    const productUpdated = await product.findOneAndUpdate(
        {
            _id: new Types.ObjectId(product_id),
            userId: new Types.ObjectId(userId),
            isDraft: true
        },
        foundProduct,
        { new: true }
    ).lean().exec();

    return productUpdated;
}

const publishAllProductByShop = async ({ userId }) => {
    const foundProducts = await product.find(
        {
            userId: new Types.ObjectId(userId),
            isDraft: true,
            isPublished: false
        }
    ).lean().exec();

    if (!foundProducts) return null;

    foundProducts.forEach(async (item) => {
        item.isDraft = false;
        item.isPublished = true;
        await product.findByIdAndUpdate(
            {
                _id: new Types.ObjectId(item._id),
                userId: new Types.ObjectId(userId),
                isDraft: true,
                isPublished: false
            },
            item,
            { new: true }
        ).lean().exec();
    })

    return foundProducts;
}

const unpublishProductByShop = async ({ product_id, userId }) => {
    const foundProduct = await product.findOne(
        {
            _id: new Types.ObjectId(product_id),
            userId: new Types.ObjectId(userId),
            isPublished: true
        }
    ).lean().exec();

    if (!foundProduct) return null;

    foundProduct.isDraft = true;
    foundProduct.isPublished = false;
    const productUpdated = await product.findOneAndUpdate(
        {
            _id: new Types.ObjectId(product_id),
            userId: new Types.ObjectId(userId),
            isPublished: true
        },
        foundProduct,
        { new: true }
    ).lean().exec();

    return productUpdated;
}

const queryProduct = async ({ query, limit, skip }) => {
    return await product.find(query).
        populate('userId', 'name email -_id').
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
    checkProductByServer,
    countFindAllProducts,
    publishAllProductByShop
}