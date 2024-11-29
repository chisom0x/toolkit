"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_upload_1 = require("../utils/multer_upload");
const image_compressor_1 = __importDefault(require("../controllers/image_compressor"));
const router = (0, express_1.Router)();
//@ts-ignore
router.post('/compress-image', multer_upload_1.uploadImage.single('file'), image_compressor_1.default.compressImage);
//@ts-ignore
router.get('/get-compressed-image', image_compressor_1.default.getCompressedImage);
//@ts-ignore
router.delete('/delete-compressed-image/:id', image_compressor_1.default.deleteImage);
exports.default = router;
