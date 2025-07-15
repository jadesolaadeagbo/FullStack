import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated';
import editUser from '../controllers/user/editUser';
import createAdmin from '../controllers/admin/createAdmin';
import { isAdmin } from '../middleware/isAdmin';

const router = express.Router();

router.post('/admin/create', isAuthenticated, isAdmin, createAdmin);
router.patch('/user/edit', isAuthenticated, editUser);

export default router;
