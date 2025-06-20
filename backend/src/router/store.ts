import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated';
import { isAdmin } from '../middleware/isAdmin';
import { createStore, getStores, getStoreById, updateStore, deleteStore } from '../controllers/catalogue/store';


const router = express.Router();

router.post("/stores", isAuthenticated, isAdmin, createStore)
router.get("/stores", getStores)
router.get("/store/:storeId", getStoreById)
router.patch("/store/:storeId", isAuthenticated, isAdmin, updateStore)
router.delete("/store/:storeId", isAuthenticated, isAdmin, deleteStore)

export default router;
