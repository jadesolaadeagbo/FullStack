import express from 'express';
import login from '../controllers/auth/login';
import signup from '../controllers/auth/signup';
import logout from '../controllers/auth/logout';
import authStatus from '../controllers/auth/authStatus';
import requestPasswordReset from '../controllers/auth/passwordReset/requestPasswordReset';
import verifyResetCode from '../controllers/auth/passwordReset/verifyResetCode';
import setNewPassword from '../controllers/auth/passwordReset/setNewPassword';

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/logout', logout);
router.get('/status', authStatus);
router.post('/password-reset', requestPasswordReset);
router.post('/password-reset/verify', verifyResetCode);
router.post('/password-reset/confirm', setNewPassword);

export default router;
