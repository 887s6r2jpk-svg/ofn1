import mongoose from 'mongoose';

const energySchema = new mongoose.Schema({
  userCode: { type: String, required: true, index: true },
  amount: { type: Number, default: 0 },
  updated_at: { type: Date, default: Date.now }
});

export default mongoose.model('Energy', energySchema);
