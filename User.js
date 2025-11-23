import mongoose from 'mongoose';

// Mirrors legacy MySQL users table plus generation cooldown tracking.
// Original columns: code (CHAR 32), username, email, password, xp, level, timestamps.
// Added: last_generation_time (Number epoch ms) for item creation cooldown logic.
const userSchema = new mongoose.Schema({
  code: { type: String, unique: true, required: true, index: true },
  username: { type: String },
  email: { type: String, unique: true, sparse: true }, // allow null-like absence
  password: { type: String },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  last_generation_time: { type: Number, default: null },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.models.User || mongoose.model('User', userSchema);
