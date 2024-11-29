"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = require("./app");
const mongoose_1 = __importDefault(require("mongoose"));
const DB = process.env.DB;
mongoose_1.default.connect('mongodb://0.0.0.0:27017/toolkit')
    .then(() => {
    console.log('MongoDB Connected!');
})
    .catch((err) => console.error('MongoDB connection error:', err));
const server = (0, app_1.createServer)();
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log();
    console.log(`Api running on ${port}`);
});
