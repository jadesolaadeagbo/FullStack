// models/cart.ts
import mongoose, { Document, Model, ObjectId, Schema, Types } from 'mongoose';
import { IProduct } from './product';

export interface ICartItem {
  product: Types.ObjectId | IProduct;
  quantity: number;
  price: number;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

export interface ICart extends Document {
  userId: ObjectId;
  items: ICartItem[];
  total: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<ICart>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: {
      type: [cartItemSchema],
      required: true
      // validate: (v: ICartItem[]) => v.length > 0,
    },
    total: { type: Number, required: true, min: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

cartSchema.pre('save', function (next) {
  this.total = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  next();
});

cartSchema.index({ userId: 1, isActive: 1 }, { unique: true });

export const Cart: Model<ICart> = mongoose.model<ICart>('Cart', cartSchema);
