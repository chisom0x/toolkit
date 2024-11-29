"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("./response");
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (err.isOperational) {
        (0, response_1.errorResponse)(res, err.statusCode, err.message);
    }
    else {
        console.error('ERROR:', err);
        (0, response_1.errorResponse)(res, err.statusCode, 'Something went wrong!');
    }
};
exports.default = globalErrorHandler;
