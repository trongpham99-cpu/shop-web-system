const InventoryService = require('../services/inventory.service');
const { SuccessResponse } = require('../core/success.response');

class inventoryController {
    addStockToInventory = async (req, res, next) => {
        new SuccessResponse({
            message: 'Add stock to inventory success',
            metadata: await InventoryService.addStockToInventory(req.body)
        }).send(res)
    }
}

module.exports = new inventoryController()