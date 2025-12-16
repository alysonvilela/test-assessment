const formatPaginationResponse = (data, page, pageSize, total) => {
    const pageCount = Math.ceil(total / pageSize);
    
    return {
        data,
        meta: {
            pagination: {
                page: Number(page),
                pageSize: Number(pageSize),
                pageCount: Number(pageCount),
                total: Number(total)
            }
        }
    };
};

module.exports = {
    formatPaginationResponse
};

