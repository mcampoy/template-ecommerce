import mongoose, { Schema, model, Model } from 'mongoose';

const  productSchema = new Schema({
  description: { type: String, required: true },
  images: [{ type: String}],
  inStock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  sizes: { type: String, required: true },
  slug: [{ 
    type: String,
    enum: {
      values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']
    },
    required: true }],
  tags
  title
  type
  gender
});