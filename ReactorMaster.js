import mongoose from 'mongoose';

const reactorMasterSchema = new mongoose.Schema({
  reactorId: { type: Number, unique: true, index: true },
  name: { type: String, required: true },
  price_ocu: { type: Number, required: true },
  base_feu_per_hour: { type: Number, required: true },
  base_cycle_minutes: { type: Number, required: true },
  base_efficiency: { type: Number, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: false }, collection: 'reactors_master' });

export default mongoose.models.ReactorMaster || mongoose.model('ReactorMaster', reactorMasterSchema, 'reactors_master');
