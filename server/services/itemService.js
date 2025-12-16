const itemRepository = require('../repositories/itemRepository');
const itemMapper = require('../mappers/itemMapper');
const paginationUtil = require('../utils/paginationUtil');
const ErrorHandler = require('../utils/errorHandler');

const getAllItems = async (page, limit) => {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    
    const { items, total } = itemRepository.findAll({ page: pageNum, limit: limitNum });
    const dtoList = itemMapper.toDTOList(items);
    
    return paginationUtil.formatPaginationResponse(dtoList, pageNum, limitNum, total);
};

const getItemById = async (id) => {
    const item = itemRepository.findActiveById(id);
    
    if (!item) {
        throw new ErrorHandler('Item not found', 404);
    }
    
    return itemMapper.toDTO(item);
};

const createItem = async (createDTO) => {
    const domainEntity = itemMapper.toDomain(createDTO);
    const createdItem = itemRepository.create(domainEntity);
    return itemMapper.toDTO(createdItem);
};

const updateItem = async (id, updateDTO) => {
    const existingItem = itemRepository.findActiveById(id);
    
    if (!existingItem) {
        throw new ErrorHandler('Item not found', 404);
    }
    
    const domainUpdate = itemMapper.toDomainUpdate(updateDTO);
    const updatedItem = itemRepository.update(id, domainUpdate);
    
    return itemMapper.toDTO(updatedItem);
};

const deleteItem = async (id) => {
    const existingItem = itemRepository.findActiveById(id);
    
    if (!existingItem) {
        throw new ErrorHandler('Item not found', 404);
    }
    
    if (existingItem.deletedAt !== null) {
        throw new ErrorHandler('Item not found', 404);
    }
    
    itemRepository.softDelete(id);
    return { success: true };
};

module.exports = {
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem
};

