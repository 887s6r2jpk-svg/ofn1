import mongoose from 'mongoose';

const balanceSchema = new mongoose.Schema({
  userCode: { type: String, required: true, index: true },
  feu: { type: Number, default: 1000 },
  ocu: { type: Number, default: 500 },
});

export default mongoose.model('Balance', balanceSchema);
