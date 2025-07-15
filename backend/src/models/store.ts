import mongoose, { Document, Model, ObjectId } from 'mongoose';

export interface IStore extends Document {
  _id: ObjectId;
  name: string;
  description?: string;
  location: string;
  storeImage?: string;
  createdAt: Date;
  updatedAt: Date;
  products: mongoose.Types.ObjectId[];
}

const storeSchema = new mongoose.Schema(
  {
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
    location: {
      type: String,
      trim: true,
    },
    storeImage: {
      type: String,
      default: '',
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

export const Store: Model<IStore> = mongoose.model<IStore>('Store', storeSchema);
