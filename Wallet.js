import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema({
  userCode: { type: String, required: true, index: true },
  address: { type: String },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Wallet', walletSchema);
