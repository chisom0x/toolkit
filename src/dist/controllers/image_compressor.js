"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_compressor_1 = __importDefault(require("../services/image_compressor"));
const response_1 = require("../utils/response");
const app_error_1 = __importDefault(require("../utils/app_error"));
const cloudinary_upload_1 = require("../utils/cloudinary_upload");
const sharp_1 = __importDefault(require("sharp"));
class imageCompressorController {
    static compressImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                console.log(file === null || file === void 0 ? void 0 : file.path);
                if (!file) {
                    return next(new app_error_1.default('Please provide an image!', 400));
                }
                const initialSize = file.buffer.length;
                const compressedBuffer = yield (0, sharp_1.default)(file.buffer)
                    .jpeg({ quality: 50 })
                    .toBuffer();
                if (!compressedBuffer)
                    return next(new app_error_1.default('Error compressing file!', 500));
                const newSize = compressedBuffer.length;
                const reduction = ((initialSize - newSize) / initialSize) * 100;
                const formatFileSize = (sizeInBytes) => {
                    if (sizeInBytes >= 1024 * 1024) {
                        return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
                    }
                    else {
                        return `${(sizeInBytes / 1024).toFixed(2)} KB`;
                    }
                };
                // Format the sizes
                const initialSizeFormatted = formatFileSize(initialSize);
                const newSizeFormatted = formatFileSize(newSize);
                const summary = `${reduction.toFixed(0)}% Smaller (${initialSizeFormatted} to ${newSizeFormatted})`;
                const imageUrl = yield (0, cloudinary_upload_1.uploadPhotoBufferToCloudinary)(compressedBuffer);
                if (!imageUrl)
                    return next(new app_error_1.default('Error Uploading compressed file!', 500));
                const uploadedImage = yield image_compressor_1.default.uploadImageLink(imageUrl, summary);
                return (0, response_1.successResponse)(res, {
                    file: uploadedImage.file_link,
                    text: summary,
                    sessionId: uploadedImage.sessionId,
                    id: uploadedImage._id,
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static getCompressedImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sessionId } = req.body;
                const session = sessionId || null;
                const compressedImage = yield image_compressor_1.default.getImageLink(sessionId);
                if (session === null || compressedImage === null) {
                    return (0, response_1.successResponse)(res, {
                        file: null,
                        text: null,
                        sessionId: null,
                        id: null,
                    });
                }
                else {
                    return (0, response_1.successResponse)(res, {
                        file: compressedImage === null || compressedImage === void 0 ? void 0 : compressedImage.file_link,
                        text: compressedImage.text,
                        sessionId: compressedImage === null || compressedImage === void 0 ? void 0 : compressedImage.sessionId,
                        id: compressedImage === null || compressedImage === void 0 ? void 0 : compressedImage._id,
                    });
                }
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static deleteImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield image_compressor_1.default.deleteImageLink(id);
                return (0, response_1.successResponse)(res, null);
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = imageCompressorController;
