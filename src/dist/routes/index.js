"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const image_compressor_routes_1 = __importDefault(require("./image_compressor_routes"));
const background_remover_routes_1 = __importDefault(require("./background_remover_routes"));
const qr_code_generator_routes_1 = __importDefault(require("./qr_code_generator_routes"));
const router = (0, express_1.Router)();
router.use('/', image_compressor_routes_1.default);
router.use('/', qr_code_generator_routes_1.default);
router.use('/', background_remover_routes_1.default);
exports.default = router;
