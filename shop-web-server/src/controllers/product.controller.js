const ProductService = require('../services/product.service')
const { SuccessResponse } = require('../core/success.response')
const { uploadSingleImage } = require('../services/cloud_dinary.service');

class ProductController {
    createProduct = async (req, res, next) => {
        const file = req.file
        const resFileURL = await uploadSingleImage(file.filename)
        const requestPayload = {
            ...req.body,
            userId: req.user._id,
            product_thumb: resFileURL.url,
            product_category: req.body.product_category,
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
        const requestPayload = {
            ...req.body,
            userId: req.user._id,
            product_category: req.body.product_category,
            product_attributes: {
                "brand": "Levis",
                "size": "M",
                "material": "Denim",
                "color": "yellow-black"
            }
        }

        req.body.product_type = req.body.product_type || 'clothing'

        new SuccessResponse({
            message: 'Update Product Success',
            metadata: await ProductService.updateProduct({
                type: req.body.product_type,
                productId: req.params.id,
                payload: requestPayload
            })
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

    uploadImage = async (req, res, next) => {
        const file = req.file
        const resFileURL = await uploadSingleImage(file.filename)
        const fileURL = resFileURL.url
        console.log(fileURL)
        new SuccessResponse({
            message: 'Upload Image Success',
            metadata: await ProductService.uploadImage({
                product_id: req.params.id,
                userId: req.user._id,
                fileURL: fileURL
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

    deleteProduct = async (req, res, next) => {
        new SuccessResponse({
            message: 'Delete Product Success',
            metadata: await ProductService.deleteProduct({
                product_id: req.params.id,
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
                keyword: req.query.keyword,
                category: req.query.category
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