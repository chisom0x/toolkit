"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthHeader = exports.setAuthHeader = void 0;
const setAuthHeader = (req, token) => {
    req.headers['Authorization'] = token;
};
exports.setAuthHeader = setAuthHeader;
const getAuthHeader = (req) => {
    const authHeader = req.headers['authorization'];
    if (authHeader && typeof authHeader === 'string') {
        return authHeader;
    }
    return undefined;
};
exports.getAuthHeader = getAuthHeader;
