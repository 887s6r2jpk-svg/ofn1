import mongoose from 'mongoose';

const marketplaceListingSchema = new mongoose.Schema({
  itemId: { type: Number, required: true, unique: true, index: true },
  sellerUserCode: { type: String, required: true, index: true },
  buyerUserCode: { type: String, index: true, default: null },
  price: { type: Number, required: true },
  platform_fee: { type: Number, default: 0 },
  status: { type: String, enum: ['active','sold','cancelled'], default: 'active', index: true },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, collection: 'marketplace_listings' });

export default mongoose.models.MarketplaceListing || mongoose.model('MarketplaceListing', marketplaceListingSchema, 'marketplace_listings');
