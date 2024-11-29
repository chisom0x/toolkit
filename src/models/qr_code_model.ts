import mongoose from 'mongoose';

const qrCodeSchema = new mongoose.Schema({
  file_link: { type: String, required: true },
  sessionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), index: { expires: '30m' } },
});

const qrCodeModel = mongoose.model('qrCode', qrCodeSchema);
export default qrCodeModel;