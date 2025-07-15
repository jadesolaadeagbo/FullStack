import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose';

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  storeId: ObjectId;
  name: string;
  description?: string;
  price: number;
  stock: number;
  productImage?: string;
  createdAt: Date;
  updatedAt: Date;
}
const productSchema = new mongoose.Schema(
  {
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    productImage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const Product: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema);
