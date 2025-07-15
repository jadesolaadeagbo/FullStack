// controllers/cartController.ts
import mongoose, { Types } from 'mongoose';
import { Request, Response } from 'express';
import { Cart } from '../../models/cart';
import { Order } from '../../models/orders';
import { Product, IProduct } from '../../models/product';
import { User } from '../../models/user';

/**
 * POST /api/cart/checkout
 * Body (optional): { customerName?: string, customerEmail?: string }
 */

type PopulatedCartItem = {
  product: IProduct;
  quantity: number;
  price: number;
};

export const checkoutCart = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.session.userId as Types.ObjectId;
  const { customerName, customerEmail } = req.body ?? {};

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const cart = await Cart.findOne({ userId, isActive: true })
      .populate<{ items: PopulatedCartItem[] }>('items.product')
      .session(session);

    if (!cart || cart.items.length === 0) {
      await session.abortTransaction();
      res.status(400).json({ message: 'Cart is empty or does not exist' });
      return;
    }

    for (const line of cart.items) {
      const product = line.product;
      if (product.stock < line.quantity) {
        await session.abortTransaction();
        res.status(400).json({
          message: `Insufficient stock for "${product.name}". Available: ${product.stock}`,
        });
        return;
      }
      product.stock -= line.quantity;
      await product.save({ session });
    }

    const user = await User.findById(userId);
    const orderDoc = await Order.create(
      [
        {
          storeId: cart.items[0].product.storeId,
          items: cart.items.map(({ product, quantity, price }) => ({
            product,
            quantity,
            price,
          })),
          totalAmount: cart.total,
          customerName: customerName ?? user?.firstName ?? 'Guest',
          customerEmail: customerEmail ?? user?.email ?? 'guest@example.com',
          status: 'paid', // or 'pending' until you integrate payment gateway
        },
      ],
      { session }
    );

    // 4. Close cart
    cart.isActive = false;
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: 'Checkout successful',
      order: orderDoc[0],
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: 'Checkout failed', error: err });
  }
};
