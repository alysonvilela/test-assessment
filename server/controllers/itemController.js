const itemService = require('../services/itemService');
const asyncErrorHandler = require('../middlewares/helpers/asyncErrorHandler');

exports.getAllItems = asyncErrorHandler(async (req, res, next) => {
    const { page, limit } = req.query;
    const result = await itemService.getAllItems(page, limit);
    
    res.status(200).json({
        ...result
    });
});

exports.createItem = asyncErrorHandler(async (req, res, next) => {
    const item = await itemService.createItem(req.body);
    
    res.status(201).json({
        data: item
    });
});

exports.getItemById = asyncErrorHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const item = await itemService.getItemById(id);
    
    res.status(200).json({
        data: item
    });
});

exports.updateItem = asyncErrorHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);
    const item = await itemService.updateItem(id, req.body);
    
    res.status(200).json({
        data: item
    });
});

exports.deleteItem = asyncErrorHandler(async (req, res, next) => {
    const id = parseInt(req.params.id);
    await itemService.deleteItem(id);
    
    res.status(200);
});

