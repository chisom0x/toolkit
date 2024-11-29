import mongoose from 'mongoose';

const backgroundRemoverSchema = new mongoose.Schema({
  file_link: { type: String, required: true },
  sessionId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now(), index: { expires: '30m' } },
});

const backgroundRemoverModel = mongoose.model('backgroundRemover', backgroundRemoverSchema);
export default backgroundRemoverModel;