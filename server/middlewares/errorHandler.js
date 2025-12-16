const ErrorHandler = require('../utils/errorHandler');

const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    const statusCode = err.statusCode;
    const statusText = getStatusText(statusCode);
    const timestamp = new Date().toISOString();
    const path = req.originalUrl || req.url;

    res.status(statusCode).json({
        timestamp,
        status: statusCode,
        error: statusText,
        message: err.message,
        path
    });
};

const getStatusText = (statusCode) => {
    const statusTexts = {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        409: 'Conflict',
        422: 'Unprocessable Entity',
        500: 'Internal Server Error'
    };
    return statusTexts[statusCode] || 'Error';
};

module.exports = errorMiddleware;

