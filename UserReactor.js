import mongoose from 'mongoose';

const userReactorSchema = new mongoose.Schema({
  userCode: { type: String, required: true, index: true },
  reactorId: { type: Number, required: true, index: true },
  level: { type: Number, default: 1 },
  efficiency: { type: Number, default: 0 },
  last_claim_timestamp: { type: Number, default: 0 },
  auto_mining: { type: Boolean, default: false },
}, { timestamps: { createdAt: 'purchased_at', updatedAt: 'updated_at' }, collection: 'user_reactors' });
userReactorSchema.index({ userCode: 1, reactorId: 1 }, { unique: false });

export default mongoose.models.UserReactor || mongoose.model('UserReactor', userReactorSchema, 'user_reactors');
