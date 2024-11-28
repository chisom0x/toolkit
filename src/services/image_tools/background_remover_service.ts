import backgroundRemoverModel from '../../models/image_tools/background_remover_model';
import { v4 as uuid } from 'uuid';
const sessionId = uuid();

export default class backgroundRemoverService {
  static async uploadImageLink(link: string) {
    try {
      await backgroundRemoverModel.deleteMany({ sessionId });
      const imageLink = await backgroundRemoverModel.create({
        file_link: link,
        sessionId: sessionId,
      });
      return imageLink;
    } catch (error) {
      throw error;
    }
  }

  static async getImage(sessionId: string) {
    try {
      const qrCode = await backgroundRemoverModel.findOne({
        sessionId: sessionId,
      });
      if (!qrCode) return null;
      return qrCode;
    } catch (error) {
      throw error;
    }
  }

  static async deleteImageLink(id: string) {
    try {
      await backgroundRemoverModel.deleteOne({ _id: id });
      return null;
    } catch (error) {
      throw error;
    }
  }
}
