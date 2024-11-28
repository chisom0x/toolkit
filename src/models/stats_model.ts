import mongoose from 'mongoose';

const statsSchema = new mongoose.Schema({
  pdf: { type: Number, default: 0 },
  image: { type: Number, default: 0 },
  audio: { type: Number, default: 0 },
  total: { type: Number, default: 0 },
});

const statsModel = mongoose.model('stats', statsSchema);
export default statsModel;
