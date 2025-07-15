import mongoose, { Document, Model, ObjectId, Schema } from 'mongoose';

export interface IOrderItem {
  product: ObjectId;
  quantity: number;
  price: number;
}

export interface IOrder extends Document {
  storeId: ObjectId;
  items: IOrderItem[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  status: 'pending' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new mongoose.Schema<IOrderItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema<IOrder>(
  {
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: (v: IOrderItem[]) => v.length > 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> = mongoose.model<IOrder>('Order', orderSchema);
