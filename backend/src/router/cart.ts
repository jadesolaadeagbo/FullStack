import express from 'express';
import { addToCart } from '../controllers/orders/cart';
import { getOrCreateCart } from '../controllers/orders/cart';
import { removeCartItem } from '../controllers/orders/cart';
import { updateCartItem } from '../controllers/orders/cart';
import { clearCart } from '../controllers/orders/cart';
import { checkoutCart } from '../controllers/orders/orders';
import isAuthenticated from '../middleware/isAuthenticated';

const router = express.Router();

router.get('/', isAuthenticated, getOrCreateCart);
router.post('/add', isAuthenticated, addToCart);
router.put('/update', isAuthenticated, updateCartItem);
router.delete('/remove/:productId', isAuthenticated, removeCartItem);
router.delete('/clear', isAuthenticated, clearCart);
router.delete('/checkout', isAuthenticated, checkoutCart);

export default router;
