import backgroundRemoverService from '../services/background_remover_service';
import { successResponse } from '../utils/response';
import AppError from '../utils/app_error';
import { uploadPhotoBufferToCloudinary } from '../utils/cloudinary_upload';
import { Request, Response, NextFunction } from 'express';
import { removeBackgroundFromImageBase64 } from 'remove.bg';
import { buffer } from 'stream/consumers';

export default class backgroundRemoverController {
  static async removeBackground(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const file = req.file;
      if (!file) {
        return next(new AppError('Please provide an image!', 400));
      }

      const result = await removeBackgroundFromImageBase64({
        apiKey: process.env.REMOVEBG_API_KEY as string,
        base64img: file.buffer.toString('base64'),
        size: 'auto',
        type: 'auto',
      });

      if (!result.base64img) {
        return next(new AppError('Error Removing Image Background', 400));
      }

      const outputBuffer = Buffer.from(result.base64img, 'base64');
      const imageUrl = await uploadPhotoBufferToCloudinary(outputBuffer);
      const uploadImage = await backgroundRemoverService.uploadImageLink(
        imageUrl
      );

      return successResponse(res, {
        file: imageUrl,
        text: 'Your file is ready',
        sessionId: uploadImage.sessionId,
        id: uploadImage._id,
      });
    } catch (error) {
      console.error('Error removing background:', error);
      return next(error);
    }
  }

  static async getRemovedBackground(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { sessionId } = req.body;

      const session = sessionId || null;
      const removedBackground = await backgroundRemoverService.getImage(
        sessionId
      );

      if (session === null || removedBackground === null) {
        return successResponse(res, {
          file: null,
          text: null,
          sessionId: null,
          id: null,
        });
      } else {
        return successResponse(res, {
          file: removedBackground?.file_link,
          text: 'your file is ready',
          sessionId: removedBackground?.sessionId,
          id: removedBackground?._id,
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  static async deleteImage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await backgroundRemoverService.deleteImageLink(id);
      return successResponse(res, null);
    } catch (error) {
      return next(error);
    }
  }
}
