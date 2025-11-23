import mongoose from 'mongoose';

// Mirrors energy_logs MySQL table.
const energyLogSchema = new mongoose.Schema({
  userCode: { type: String, required: true, index: true },
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  meta: { type: mongoose.Schema.Types.Mixed, default: null },
}, { timestamps: { createdAt: 'created_at' }, collection: 'energy_logs' });

export default mongoose.models.EnergyLog || mongoose.model('EnergyLog', energyLogSchema, 'energy_logs');
