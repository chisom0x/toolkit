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
const image_compressor_model_1 = __importDefault(require("../models/image_compressor_model"));
const uuid_1 = require("uuid");
const sessionId = (0, uuid_1.v4)();
class imageCompressorService {
    static uploadImageLink(link, text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imageLink = yield image_compressor_model_1.default.create({
                    file_link: link,
                    text: text,
                    sessionId: sessionId,
                });
                return imageLink;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static getImageLink(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const imageLink = yield image_compressor_model_1.default.findOne({
                    sessionId: sessionId,
                });
                if (!imageLink)
                    return null;
                return imageLink;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static deleteImageLink(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield image_compressor_model_1.default.deleteOne({ _id: id });
                return null;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = imageCompressorService;
