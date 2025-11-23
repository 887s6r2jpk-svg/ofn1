import mongoose from 'mongoose';

// Revised schema to reflect original SQL item attributes plus additional creation metadata used in routes.
// Adds itemId (numeric sequence), item_code, creation_cost_feu, creator_level, and timestamps.
const itemSchema = new mongoose.Schema({
  itemId: { type: Number, unique: true, index: true }, // replaces legacy auto_increment id
  ownerUserCode: { type: String, required: true, index: true },
  rarity: { type: String, enum: ['Common','Rare','Epic','Legendary','Mythic'], required: true },
  field_strength: { type: Number, required: true },
  entropy: { type: Number, required: true },
  purity: { type: Number, required: true },
  stability: { type: Number, required: true },
  pattern: { type: String, required: true },
  item_code: { type: String, unique: true, index: true },
  creation_cost_feu: { type: Number, required: true },
  creator_level: { type: Number, required: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

export default mongoose.models.Item || mongoose.model('Item', itemSchema);
