import mongoose from 'mongoose';

// Global task definition (mirrors MySQL tasks table)
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  reward_feu: { type: Number, default: 0 },
  reward_xp: { type: Number, default: 0 },
  reward_ocu: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, collection: 'tasks' });

export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema, 'tasks');

// User progress (mirrors task_progress join table)
const taskProgressSchema = new mongoose.Schema({
  userCode: { type: String, required: true, index: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Task' },
  status: { type: String, enum: ['claimed'], default: 'claimed' },
}, { timestamps: { createdAt: 'created_at' }, collection: 'task_progress' });
taskProgressSchema.index({ userCode: 1, taskId: 1 }, { unique: true });

export const TaskProgress = mongoose.models.TaskProgress || mongoose.model('TaskProgress', taskProgressSchema, 'task_progress');
