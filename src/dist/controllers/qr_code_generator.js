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
const qr_code_service_1 = __importDefault(require("../services/qr_code_service"));
const qr_code_generator_1 = __importDefault(require("../utils/qr_code_generator"));
const response_1 = require("../utils/response");
const app_error_1 = __importDefault(require("../utils/app_error"));
const cloudinary_upload_1 = require("../utils/cloudinary_upload");
class qrCodeController {
    static generateQrCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { url } = req.body;
                if (!url)
                    return next(new app_error_1.default('Please provide a URL!', 400));
                const qrCode = yield (0, qr_code_generator_1.default)(url);
                if (!qrCode)
                    return next(new app_error_1.default('Error Generating QR CODE!', 500));
                const qrCodeUrl = yield (0, cloudinary_upload_1.uploadPhotoBufferToCloudinary)(qrCode);
                if (!qrCodeUrl)
                    return next(new app_error_1.default('failed to upload QR Code!', 500));
                const uploadedQr = yield qr_code_service_1.default.uploadImageLink(qrCodeUrl);
                return (0, response_1.successResponse)(res, {
                    file: qrCodeUrl,
                    text: 'your file is ready',
                    sessionId: uploadedQr.sessionId,
                    id: uploadedQr._id,
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static getQrCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sessionId } = req.body;
                const session = sessionId || null;
                const qrCode = yield qr_code_service_1.default.getQrCode(session);
                if (session === null || qrCode === null) {
                    return (0, response_1.successResponse)(res, {
                        file: null,
                        text: null,
                        sessionId: null,
                        id: null,
                    });
                }
                else {
                    return (0, response_1.successResponse)(res, {
                        file: qrCode === null || qrCode === void 0 ? void 0 : qrCode.file_link,
                        text: 'your file is ready',
                        sessionId: qrCode === null || qrCode === void 0 ? void 0 : qrCode.sessionId,
                        id: qrCode === null || qrCode === void 0 ? void 0 : qrCode._id,
                    });
                }
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static deleteQrCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield qr_code_service_1.default.deleteImageLink(id);
                return (0, response_1.successResponse)(res, null);
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = qrCodeController;
