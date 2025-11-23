import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['market','wallet_export','owner_reward'], required: true },
  fromUserCode: { type: String, index: true, default: null },
  toUserCode: { type: String, index: true, default: null },
  itemId: { type: Number, index: true, default: null },
  amount: { type: Number, default: 0 },
  status: { type: String, default: 'completed' },
  meta: { type: mongoose.Schema.Types.Mixed, default: null },
}, { timestamps: { createdAt: 'created_at' } });

export default mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);
