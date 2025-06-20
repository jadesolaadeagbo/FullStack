import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated';
import { isAdmin } from '../middleware/isAdmin';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/catalogue/product';

const router = express.Router();

router.post("/stores/:storeId/products", isAuthenticated, isAdmin, createProduct)
router.get("/products", getProducts)
router.get("/product/:productId", getProductById)
router.patch("/product/:productId", isAuthenticated, isAdmin, updateProduct)
router.delete("/product/:productId", isAuthenticated, isAdmin, deleteProduct)

export default router;


//For all products in all stores. To check for products under a store, refer to getStoreById route
