const Decimal = require('decimal.js');

class ItemMapper {
    toDTO(item) {
        if (!item) return null;
        
        return {
            id: item.id,
            name: item.name,
            price: item.price instanceof Decimal ? item.price.toNumber() : item.price,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt
        };
    }

    toDTOList(items) {
        return items.map(item => this.toDTO(item));
    }

    toDomain(createDTO) {
        return {
            name: createDTO.name,
            price: new Decimal(createDTO.price)
        };
    }

    toDomainUpdate(updateDTO) {
        const domain = {};
        
        if (updateDTO.name !== undefined) {
            domain.name = updateDTO.name;
        }
        if (updateDTO.price !== undefined) {
            domain.price = new Decimal(updateDTO.price);
        }
        
        return domain;
    }
}

module.exports = new ItemMapper();

