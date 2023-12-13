const ProductService = require('../services/product.service')
const { SuccessResponse } = require('../core/success.response')

class ProductController {
    createProduct = async (req, res, next) => {
        const file = req.file
        const fileURL = `http://localhost:${process.env.PORT}/public/images/${file.filename}`

        const requestPayload = {
            ...req.body,
            userId: req.user._id,
            product_thumb: fileURL,
            product_attributes: {
                "brand": "Levis",
                "size": "M",
                "material": "Denim",
                "color": "yellow-black"
            }
        }

        new SuccessResponse({
            message: 'Create Product Success',
            metadata: await ProductService.createProduct(req.body.product_type, requestPayload)
        }).send(res)
    }

    //PUT//
    updateProduct = async (req, res, next) => {
        const file = req.file
        const fileURL = `http://localhost:${process.env.PORT}/public/images/${file.filename}`

        const requestPayload = {
            ...req.body,
            userId: req.user._id,
        }

        if (file) {
            requestPayload.product_thumb = fileURL
        }

        new SuccessResponse({
            message: 'Update Product Success',
            metadata: await ProductService.updateProduct(req.body.product_type, req.params.id, requestPayload)
        }).send(res)
    }

    publishProductByShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Publish Product Success',
            metadata: await ProductService.publishProductByShop({
                product_id: req.params.id,
                userId: req.user._id
            })
        }).send(res)
    }

    publishAllProductByShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Publish All Product Success',
            metadata: await ProductService.publishAllProductByShop({
                userId: req.user._id
            })
        }).send(res)
    }

    unpublishProductByShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Unpublish Product Success',
            metadata: await ProductService.unpublishProductByShop({
                product_id: req.params.id,
                userId: req.user._id
            })
        }).send(res)
    }

    //QUERY//
    getAllDraftsForShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get All Drafts Success',
            metadata: await ProductService.findAllDraftsForShop({
                userId: req.user._id,
            })
        }).send(res)
    }

    getAllProductsForAdmin = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get All Products Success',
            metadata: await ProductService.getAllProductsForAdmin({
                limit: req.query.limit,
                sort: req.query.sort,
                page: req.query.page,
                filter: req.query.filter
            })
        }).send(res)
    }

    getAllPublishedForShop = async (req, res, next) => {
        new SuccessResponse({
            message: 'Get All Published Success',
            metadata: await ProductService.findAllPublishedForShop({
                userId: req.user._id,
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
                filter: req.query.filter,
                keyword: req.query.keyword
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