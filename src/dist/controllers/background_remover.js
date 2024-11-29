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
const background_remover_service_1 = __importDefault(require("../services/background_remover_service"));
const response_1 = require("../utils/response");
const app_error_1 = __importDefault(require("../utils/app_error"));
const cloudinary_upload_1 = require("../utils/cloudinary_upload");
const remove_bg_1 = require("remove.bg");
class backgroundRemoverController {
    static removeBackground(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const file = req.file;
                if (!file) {
                    return next(new app_error_1.default('Please provide an image!', 400));
                }
                const result = yield (0, remove_bg_1.removeBackgroundFromImageBase64)({
                    apiKey: 'cxE7vGBGtu6hjYaXEu5hWauA',
                    base64img: file.buffer.toString('base64'),
                    size: 'auto',
                    type: 'auto',
                });
                if (!result.base64img) {
                    return next(new app_error_1.default('Error Removing Image Background', 400));
                }
                const outputBuffer = Buffer.from(result.base64img, 'base64');
                const imageUrl = yield (0, cloudinary_upload_1.uploadPhotoBufferToCloudinary)(outputBuffer);
                const uploadImage = yield background_remover_service_1.default.uploadImageLink(imageUrl);
                return (0, response_1.successResponse)(res, {
                    file: imageUrl,
                    text: 'Your file is ready',
                    sessionId: uploadImage.sessionId,
                    id: uploadImage._id,
                });
            }
            catch (error) {
                console.error('Error removing background:', error);
                return next(error);
            }
        });
    }
    static getRemovedBackground(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sessionId } = req.body;
                const session = sessionId || null;
                const removedBackground = yield background_remover_service_1.default.getImage(sessionId);
                if (session === null || removedBackground === null) {
                    return (0, response_1.successResponse)(res, {
                        file: null,
                        text: null,
                        sessionId: null,
                        id: null,
                    });
                }
                else {
                    return (0, response_1.successResponse)(res, {
                        file: removedBackground === null || removedBackground === void 0 ? void 0 : removedBackground.file_link,
                        text: 'your file is ready',
                        sessionId: removedBackground === null || removedBackground === void 0 ? void 0 : removedBackground.sessionId,
                        id: removedBackground === null || removedBackground === void 0 ? void 0 : removedBackground._id,
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
                yield background_remover_service_1.default.deleteImageLink(id);
                return (0, response_1.successResponse)(res, null);
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = backgroundRemoverController;
