import { Request, Response } from 'express';
import { Cart } from '../../models/cart';
import { Product } from '../../models/product';

export const getOrCreateCart = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.session.userId;

    let cart = await Cart.findOne({ userId, isActive: true }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [],
        total: 0,
      });
    }

    res.status(200).json(cart);
    return;
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cart', error: err });
  }
};

export const addToCart = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.session.userId;
  const { productId, quantity = 1 } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    let cart = await Cart.findOne({ userId, isActive: true });

    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
    }

    const existingItemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity,
        price: product.price,
      });
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate('items.product');

    res.status(200).json(populatedCart);
    return;
  } catch (err) {
    res.status(500).json({ message: 'Failed to add to cart', error: err });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.session.userId;
  const { productId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId, isActive: true });
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item) {
      res.status(404).json({ message: 'Item not in cart' });
      return;
    }
    if (quantity <= 0) {
      cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update item', error: err });
  }
};

export const removeCartItem = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.session.userId;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId, isActive: true });
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    await cart.save();

    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove item', error: err });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.session.userId;

  try {
    const cart = await Cart.findOne({ userId, isActive: true });
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.status(200).json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to clear cart', error: err });
  }
};
