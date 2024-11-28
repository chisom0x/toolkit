import imageToolsService from '../../services/image_tools/qr_code_service';
import genQr from '../../utils/qr_code_generator';
import { successResponse } from '../../utils/response';
import AppError from '../../utils/app_error';
import { uploadPhotoBufferToCloudinary } from '../../utils/cloudinary_upload';
import { Request, Response, NextFunction } from 'express';

export default class imageToolsController {
  static async generateQrCode(req: Request, res: Response, next: NextFunction) {
    try {
      //session id will be stored on the frontend as cookies
      const { url } = req.body;
      if (!url) return next(new AppError('Please provide a URL!', 400));

      const qrCode = await genQr(url);
      if (!qrCode) return next(new AppError('Error Generating QR CODE!', 500));

      const qrCodeUrl = await uploadPhotoBufferToCloudinary(qrCode);
      if (!qrCodeUrl)
        return next(new AppError('failed to upload QR Code!', 500));

      const uploadedQr = await imageToolsService.uploadImageLink(
        qrCodeUrl,
      );
      return successResponse(res, {
        file: qrCodeUrl,
        text: 'your file is ready',
        sessionId: uploadedQr.sessionId,
        id: uploadedQr._id,
      });
    } catch (error) {
      return next(error);
    }
  }

  static async getQrCode(req: Request, res: Response, next: NextFunction) {
    try {
      // session id will be gotten from the cookies saved on the frontend
      const { sessionId } = req.body;

      const session = sessionId || null;
      const qrCode = await imageToolsService.getQrCode(session);

      if (session === null || qrCode === null) {
        return successResponse(res, {
          file: null,
          text: null,
          sessionId: null,
          id: null,
        });
      } else {
        return successResponse(res, {
          file: qrCode?.file_link,
          text: 'your file is ready',
          sessionId: qrCode?.sessionId,
          id: qrCode?._id,
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  static async deleteQrCode(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await imageToolsService.deleteImageLink(id);
      return successResponse(res, null);
    } catch (error) {
      return next(error);
    }
  }
}