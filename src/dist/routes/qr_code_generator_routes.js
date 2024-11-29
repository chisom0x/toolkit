"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const qr_code_generator_1 = __importDefault(require("../controllers/qr_code_generator"));
const router = (0, express_1.Router)();
//@ts-ignore
router.post('/generate-qr-code', qr_code_generator_1.default.generateQrCode);
//@ts-ignore
router.get('/get-qr-code', qr_code_generator_1.default.getQrCode);
//@ts-ignore
router.delete('/delete-qr-code/:id', qr_code_generator_1.default.deleteQrCode);
exports.default = router;
