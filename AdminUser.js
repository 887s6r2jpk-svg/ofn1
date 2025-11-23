import mongoose from 'mongoose';

const adminUserSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  email: { type: String },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('AdminUser', adminUserSchema);
