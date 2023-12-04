const { product, clothing, electronic } = require('../models/product.model');
const { BadRequestError } = require('../core/error.response');
const { findAllDraftsForShop, publishProductByShop, findAllPublishForShop, unpublishProductByShop, searchProductByUser, findAllProducts, findProduct, updateProductById } = require('../models/repository/product.repo');
const { removeUndefinedObject, updateNestedObjectParser } = require('../utils');
const { insertInventory } = require('../models/repository/inventory.repo');
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

    static async publishProductByShop({ product_id, product_shop }) {
        return await publishProductByShop({ product_id, product_shop })
    }

    static async unpublishProductByShop({ product_id, product_shop }) {
        return await unpublishProductByShop({ product_id, product_shop })
    }

    //QUERY// 
    static async findAllDraftsForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isDraft: true };
        return await findAllDraftsForShop({ query, limit, skip });
    }

    static async findAllPublishedForShop({ product_shop, limit = 50, skip = 0 }) {
        const query = { product_shop, isPublished: true };
        return await findAllPublishForShop({ query, limit, skip });
    }

    static async searchProducts({ keyword }) {
        return await searchProductByUser({ keyword });
    }

    static async findAllProducts({ limit = 50, sort = 'ctime', page = 1, filter = { isPublished: true } }) {
        return await findAllProducts({ limit, sort, page, filter, select: ['product_name', 'product_price', 'product_thumb', 'product_shop'] });
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
            product_shop,
            product_attributes
        }
    ) {
        this.product_name = product_name;
        this.product_thumb = product_thumb;
        this.product_description = product_description;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_shop = product_shop;
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
                shopId: this.product_shop,
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
            product_shop: this.product_shop
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
            product_shop: this.product_shop
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