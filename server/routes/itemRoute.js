const express = require('express');
const itemController = require('../controllers/itemController');
const validator = require('../middlewares/validator');

const router = express.Router();

router.route('/items')
    .get(itemController.getAllItems)
    .post(validator.validateItem, itemController.createItem);

router.route('/items/:id')
    .get(itemController.getItemById)
    .put(validator.validateItemUpdate, itemController.updateItem)
    .delete(itemController.deleteItem);

module.exports = router;