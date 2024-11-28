import imageCompressorModel from '../../models/image_tools/image_compressor_model';
import { v4 as uuid } from 'uuid';
const sessionId = uuid();

export default class imageCompressorService {
  static async uploadImageLink(link: string, text: String) {
    try {
      await imageCompressorModel.deleteMany({ sessionId });
      const imageLink = await imageCompressorModel.create({
        file_link: link,
        text: text,
        sessionId: sessionId,
      });
      return imageLink
    } catch (error) {
      throw error;
    }
  }

  static async getImageLink(sessionId: string) {
    try {
      const imageLink = await imageCompressorModel.findOne({ sessionId: sessionId });
      if (!imageLink) return null;
      return imageLink;
    } catch (error) {
      throw error;
    }
  }

  static async deleteImageLink(id: string) {
    try {
      await imageCompressorModel.deleteOne({ _id: id });
      return null;
    } catch (error) {
      throw error;
    }
  }
}
