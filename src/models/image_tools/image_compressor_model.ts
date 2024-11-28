import mongoose from 'mongoose';

const imageCompressorSchema = new mongoose.Schema({
  file_link: { type: String, required: true },
  text: { type: String, required: true },
  sessionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), index: { expires: '30m' } },
});

const imageCompressorModel = mongoose.model('imageCompressor', imageCompressorSchema);
export default imageCompressorModel;
