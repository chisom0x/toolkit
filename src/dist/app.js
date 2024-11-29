"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
const global_error_handler_1 = __importDefault(require("./utils/global_error_handler"));
dotenv_1.default.config();
const createServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.get('/', (req, res) => {
        res.json({ message: 'Hello World' });
    });
    app.use('/api/v1/toolkit', index_1.default);
    app.use(global_error_handler_1.default);
    return app;
};
exports.createServer = createServer;
