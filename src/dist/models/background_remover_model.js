"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const backgroundRemoverSchema = new mongoose_1.default.Schema({
    file_link: { type: String, required: true },
    sessionId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now(), index: { expires: '30m' } },
});
const backgroundRemoverModel = mongoose_1.default.model('backgroundRemover', backgroundRemoverSchema);
exports.default = backgroundRemoverModel;
