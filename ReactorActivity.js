import mongoose from 'mongoose';

const reactorActivitySchema = new mongoose.Schema({
  userCode: { type: String, required: true, index: true },
  activity_type: { type: String, enum: ['purchase','upgrade','claim','efficiency_change'], required: true },
  reactor_name: { type: String },
  details: { type: mongoose.Schema.Types.Mixed, default: null },
}, { timestamps: { createdAt: 'created_at' }, collection: 'reactor_activity' });
reactorActivitySchema.index({ userCode: 1, created_at: -1 });

export default mongoose.models.ReactorActivity || mongoose.model('ReactorActivity', reactorActivitySchema, 'reactor_activity');
