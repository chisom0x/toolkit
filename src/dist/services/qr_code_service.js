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
const qr_code_model_1 = __importDefault(require("../models/qr_code_model"));
const uuid_1 = require("uuid");
const sessionId = (0, uuid_1.v4)();
class qrCodeService {
    static uploadImageLink(link) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imageLink = yield qr_code_model_1.default.create({
                    file_link: link,
                    sessionId: sessionId,
                });
                return imageLink;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getQrCode(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const qrCode = yield qr_code_model_1.default.findOne({ sessionId: sessionId });
                if (!qrCode)
                    return null;
                return qrCode;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteImageLink(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield qr_code_model_1.default.deleteOne({ _id: id });
                return null;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = qrCodeService;
