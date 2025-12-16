const Decimal = require('decimal.js');

class InMemoryItemRepository {
    constructor() {
        this.items = [];
        this.nextId = 1;
    }

    findAll(options = {}) {
        const { page = 1, limit = 10 } = options;
        const skip = (page - 1) * limit;
        
        const activeItems = this.items.filter(item => item.deletedAt === null);
        const total = activeItems.length;
        const paginatedItems = activeItems.slice(skip, skip + limit);
        
        return {
            items: paginatedItems,
            total
        };
    }

    findById(id) {
        return this.items.find(item => item.id === id) || null;
    }

    findActiveById(id) {
        const item = this.items.find(item => item.id === id);
        if (!item || item.deletedAt !== null) {
            return null;
        }
        return item;
    }

    create(itemData) {
        const now = new Date();
        const newItem = {
            id: this.nextId++,
            name: itemData.name,
            price: itemData.price instanceof Decimal ? itemData.price : new Decimal(itemData.price),
            createdAt: now,
            updatedAt: now,
            deletedAt: null
        };
        this.items.push(newItem);
        return newItem;
    }

    update(id, updateData) {
        const item = this.findById(id);
        if (!item) {
            return null;
        }
        
        if (updateData.name !== undefined) {
            item.name = updateData.name;
        }
        if (updateData.price !== undefined) {
            item.price = updateData.price instanceof Decimal ? updateData.price : new Decimal(updateData.price);
        }
        item.updatedAt = new Date();
        
        return item;
    }

    softDelete(id) {
        const item = this.findById(id);
        if (!item) {
            return null;
        }
        item.deletedAt = new Date();
        item.updatedAt = new Date();
        return item;
    }
}

module.exports = new InMemoryItemRepository();

