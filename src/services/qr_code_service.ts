import qrCodeModel from '../models/qr_code_model';
import { v4 as uuid } from 'uuid';
const sessionId = uuid();

export default class qrCodeService {
  static async uploadImageLink(link: string) {
    try {
      const imageLink = await qrCodeModel.create({
        file_link: link,
        sessionId: sessionId,
      });
      return imageLink;
    } catch (error) {
      throw error;
    }
  }

  static async getQrCode(sessionId: string | undefined) {
    try {
      const qrCode = await qrCodeModel.findOne({ sessionId: sessionId });
      if (!qrCode) return null;
      return qrCode;
    } catch (error) {
      throw error;
    }
  }

  static async deleteImageLink(id: string) {
    try {
      await qrCodeModel.deleteOne({ _id: id });
      return null;
    } catch (error) {
      throw error;
    }
  }
}
