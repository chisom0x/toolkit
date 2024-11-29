import imageCompressorService from '../services/image_compressor';
import { successResponse } from '../utils/response';
import AppError from '../utils/app_error';
import { uploadPhotoBufferToCloudinary } from '../utils/cloudinary_upload';
import { Request, Response, NextFunction } from 'express';
import sharp from 'sharp';

export default class imageCompressorController {
  static async compressImage(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;
      console.log(file?.path);
      if (!file) {
        return next(new AppError('Please provide an image!', 400));
      }

      const initialSize = file.buffer.length;

      const compressedBuffer = await sharp(file.buffer)
        .jpeg({ quality: 50 })
        .toBuffer();

      if (!compressedBuffer)
        return next(new AppError('Error compressing file!', 500));

      const newSize = compressedBuffer.length;

      const reduction = ((initialSize - newSize) / initialSize) * 100;

      const formatFileSize = (sizeInBytes: number) => {
        if (sizeInBytes >= 1024 * 1024) {
          return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
        } else {
          return `${(sizeInBytes / 1024).toFixed(2)} KB`;
        }
      };

      // Format the sizes
      const initialSizeFormatted = formatFileSize(initialSize);
      const newSizeFormatted = formatFileSize(newSize);

      const summary = `${reduction.toFixed(
        0
      )}% Smaller (${initialSizeFormatted} to ${newSizeFormatted})`;

      const imageUrl = await uploadPhotoBufferToCloudinary(compressedBuffer);

      if (!imageUrl)
        return next(new AppError('Error Uploading compressed file!', 500));

      const uploadedImage = await imageCompressorService.uploadImageLink(
        imageUrl,
        summary
      );

      return successResponse(res, {
        file: uploadedImage.file_link,
        text: summary,
        sessionId: uploadedImage.sessionId,
        id: uploadedImage._id,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getCompressedImage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { sessionId } = req.body;

      const session = sessionId || null;
      const compressedImage = await imageCompressorService.getImageLink(
        sessionId
      );

      if (session === null || compressedImage === null) {
        return successResponse(res, {
          file: null,
          text: null,
          sessionId: null,
          id: null,
        });
      } else {
        return successResponse(res, {
          file: compressedImage?.file_link,
          text: compressedImage.text,
          sessionId: compressedImage?.sessionId,
          id: compressedImage?._id,
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  static async deleteImage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await imageCompressorService.deleteImageLink(id);
      return successResponse(res, null);
    } catch (error) {
      return next(error);
    }
  }
}
