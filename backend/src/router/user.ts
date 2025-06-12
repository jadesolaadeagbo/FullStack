import express from 'express';
import isAuthenticated from '../middleware/isAuthenticated';
import editUser from '../controllers/user/editUser';

const router = express.Router();

router.patch('/user/edit', isAuthenticated, editUser);

export default router;
