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
exports.uploadAudioBufferToCloudinary = exports.uploadPhotoBufferToCloudinary = void 0;
const cloudinary_config_1 = __importDefault(require("../config/cloudinary_config"));
const stream_1 = require("stream");
const uploadPhotoBufferToCloudinary = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return new Promise((resolve, reject) => {
            const stream = cloudinary_config_1.default.uploader.upload_stream({ resource_type: 'image', folder: 'photo_uploads' }, (error, result) => {
                if (result) {
                    resolve(result.secure_url);
                }
                else {
                    reject(error);
                }
            });
            const readableStream = new stream_1.Readable();
            readableStream.push(buffer);
            readableStream.push(null);
            readableStream.pipe(stream);
        });
    }
    catch (error) {
        throw new Error(`Photo upload failed: ${error.message}`);
    }
});
exports.uploadPhotoBufferToCloudinary = uploadPhotoBufferToCloudinary;
const uploadAudioBufferToCloudinary = (buffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return new Promise((resolve, reject) => {
            const stream = cloudinary_config_1.default.uploader.upload_stream({ resource_type: 'video', folder: 'audio_uploads' }, (error, result) => {
                if (result) {
                    resolve(result.secure_url);
                }
                else {
                    reject(error);
                }
            });
            const readableStream = new stream_1.Readable();
            readableStream.push(buffer);
            readableStream.push(null);
            readableStream.pipe(stream);
        });
    }
    catch (error) {
        throw new Error(`Audio upload failed: ${error.message}`);
    }
});
exports.uploadAudioBufferToCloudinary = uploadAudioBufferToCloudinary;
