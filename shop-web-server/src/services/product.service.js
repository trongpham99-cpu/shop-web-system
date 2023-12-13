const { product, clothing, electronic } = require('../models/product.model');
const { BadRequestError } = require('../core/error.response');
const { countFindAllProducts, findAllDraftsForShop, publishProductByShop, findAllPublishForShop, unpublishProductByShop, searchProductByUser, findAllProducts, findProduct, updateProductById, publishAllProductByShop } = require('../models/repository/product.repo');
const { removeUndefinedObject, updateNestedObjectParser } = require('../utils');
const { insertInventory } = require('../models/repository/inventory.repo');
const { Types } = require('mongoose');
class ProductFactory {
    static async createProduct(type, payload) {
        switch (type) {
            case 'clothing':
                return await new Clothing(payload).createProduct();
            case 'electronics':
                return await new Electronics(payload).createProduct();
            default:
                throw new BadRequestError('Invalid product type');
        }
    }

    //PUT//

    static async updateProduct({ type, productId, payload }) {
        switch (type) {
            case 'clothing':
                return await new Clothing(payload).updateProduct(productId);
            case 'electronics':
                return await new Electronics(payload).updateProduct(productId);
            default:
                throw new BadRequestError('Invalid product type');
        }
    }

    static async publishProductByShop({ product_id, userId }) {
        return await publishProductByShop({ product_id, userId })
    }

    static async publishAllProductByShop({ userId }) {
        return await publishAllProductByShop({ userId })
    }

    static async unpublishProductByShop({ product_id, userId }) {
        return await unpublishProductByShop({ product_id, userId })
    }

    static async uploadImage({ product_id, fileURL }) {
        return await updateProductById({
            product_id,
            payload: { product_thumb: fileURL },
            model: product,
            isNew: true
        });
    }

    //QUERY// 
    static async findAllDraftsForShop({ userId, limit = 50, skip = 0 }) {
        const query = { userId, isDraft: true };
        return await findAllDraftsForShop({ query, limit, skip });
    }

    static async findAllPublishedForShop({ userId, limit = 50, skip = 0 }) {
        const query = { userId, isPublished: true };
        return await findAllPublishForShop({ query, limit, skip });
    }

    static async getAllProductsForAdmin({ limit = 50, skip = 0 }) {
        return await findAllProducts({ limit, skip });
    }

    static async searchProducts({ keyword }) {
        return await searchProductByUser({ keyword });
    }

    static async deleteProduct({ product_id }) {
        return await product.findOneAndDelete(
            {
                _id: new Types.ObjectId(product_id),
            }
        ).lean().exec();
    }

    static async findAllProducts({ limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true }, keyword = null }) {
        let products = await findAllProducts({ limit, sort, page, keyword, filter, select: ['product_name', 'product_price', 'product_thumb'] });
        let count = await countFindAllProducts({ filter });
        return {
            products,
            currentPage: page,
            totalDocuments: count,
        }
    }

    static async findProduct({ product_id }) {
        return await findProduct({ product_id, unSelect: ["__v", "product_ratingAverage"] });
    }
}

class Product {
    constructor(
        {
            product_name,
            product_thumb,
            product_description,
            product_price,
            product_quantity,
            product_type,
            userId,
            product_attributes
        }
    ) {
        this.product_name = product_name;
        this.product_thumb = product_thumb;
        this.product_description = product_description;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.userId = userId;
        this.product_attributes = product_attributes;
    }

    async createProduct(product_id) {
        const newProduct = await product.create({
            ...this,
            _id: product_id
        });

        if (newProduct) {
            //add inventory
            await insertInventory({
                productId: newProduct._id,
                shopId: this.userId,
                stock: this.product_quantity
            })
        }

        return newProduct;
    }

    async updateProduct(productId, bodyUpdate) {
        return await updateProductById({
            product_id: productId,
            payload: bodyUpdate,
            model: product,
            isNew: true
        });
    }
}

class Clothing extends Product {
    async createProduct() {
        const newClothing = await clothing.create({
            ...this.product_attributes,
            userId: this.userId
        });
        if (!newClothing) {
            throw new BadRequestError('Cannot create new clothing');
        }

        const newProduct = await super.createProduct(newClothing._id);
        if (!newProduct) {
            throw new BadRequestError('Cannot create new product');
        }

        return newProduct;
    }

    async updateProduct(productId) {
        const objectParams = removeUndefinedObject(this);
        if (objectParams.product_attributes) {
            await updateProductById({
                product_id: productId,
                payload: updateNestedObjectParser(objectParams.product_attributes),
                model: clothing,
                isNew: true
            })
        }

        const updateProduct = await super.updateProduct(productId, updateNestedObjectParser(objectParams));
        if (!updateProduct) {
            throw new BadRequestError('Cannot update product');
        }

        return updateProduct;
    }
}

class Electronics extends Product {
    async createProduct() {
        const newElectronic = await electronic.create({
            ...this.product_attributes,
            userId: this.userId
        });
        if (!newElectronic) {
            throw new BadRequestError('Cannot create new electronic');
        }

        const newProduct = await super.createProduct(newElectronic._id);
        if (!newProduct) {
            throw new BadRequestError('Cannot create new product');
        }

        return newProduct;
    }

    async updateProduct(productId) {
        const objectParams = removeUndefinedObject(this);
        if (objectParams.product_attributes) {
            await updateProductById({
                product_id: productId,
                payload: objectParams,
                model: electronic,
                isNew: true
            })
        }

        const updateProduct = await super.updateProduct(productId, objectParams);
        if (!updateProduct) {
            throw new BadRequestError('Cannot update product');
        }

        return updateProduct;
    }
}

module.exports = ProductFactory;