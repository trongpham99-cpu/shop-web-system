const ProductService = require('../services/product.service')
const { SuccessResponse } = require('../core/success.response')

class ProductController {
    createProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Create Product Success',
            metadata: await ProductService.createProduct(req.body.product_type, {
                ...req.body,
                product_shop: req.user.userId
            })
        }).send(res)
    }

    //PUT//
    updateProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Update Product Success',
            metadata: await ProductService.updateProduct(req.body.product_type, req.params.id, {
                ...req.body,
                product_shop: req.user.userId
            })
        }).send(res)
    }

    publishProductByShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Publish Product Success',
            metadata: await ProductService.publishProductByShop({
                product_id: req.params.id,
                product_shop: req.user.userId
            })
        }).send(res)
    }

    unpublishProductByShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Unpublish Product Success',
            metadata: await ProductService.unpublishProductByShop({
                product_id: req.params.id,
                product_shop: req.user.userId
            })
        }).send(res)
    }

    //QUERY//
    getAllDraftsForShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get All Drafts Success',
            metadata: await ProductService.findAllDraftsForShop({
                product_shop: req.user.userId,
            })
        }).send(res)
    }

    getAllPublishedForShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get All Published Success',
            metadata: await ProductService.findAllPublishedForShop({
                product_shop: req.user.userId,
            })
        }).send(res)
    }

    getListSearchProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get List Search Product Success',
            metadata: await ProductService.searchProducts({
                keyword: req.query.keyword,
            })
        }).send(res)
    }

    findAllProducts = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get All Products Success',
            metadata: await ProductService.findAllProducts({
                limit: req.query.limit,
                sort: req.query.sort,
                page: req.query.page,
                filter: req.query.filter
            })
        }).send(res)
    }

    findProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get Product Success',
            metadata: await ProductService.findProduct({
                product_id: req.params.id
            })
        }).send(res)
    }

    //END QUERY//
}

module.exports = new ProductController()