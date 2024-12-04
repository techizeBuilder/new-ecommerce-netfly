import mongoose from 'mongoose';

const StockSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  lowStockThreshold: {
    type: Number,
    required: true,
    default: 10,
  },
  location: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  stockHistory: [{
    quantity: Number,
    type: {
      type: String,
      enum: ['addition', 'reduction'],
      required: true,
    },
    reason: String,
    date: {
      type: Date,
      default: Date.now,
    },
  }],
});

StockSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

export default mongoose.models.Stock || mongoose.model('Stock', StockSchema);