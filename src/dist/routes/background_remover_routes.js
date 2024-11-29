"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_upload_1 = require("../utils/multer_upload");
const background_remover_1 = __importDefault(require("../controllers/background_remover"));
const router = (0, express_1.Router)();
//@ts-ignore
router.post('/remove-background', multer_upload_1.uploadImage.single('file'), 
//@ts-ignore
background_remover_1.default.removeBackground);
//@ts-ignore
router.get('/get-image', background_remover_1.default.getRemovedBackground);
//@ts-ignore
router.delete('/delete-image/:id', background_remover_1.default.deleteImage);
exports.default = router;
