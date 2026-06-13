import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    features: [String],
    deliveryTime: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);
