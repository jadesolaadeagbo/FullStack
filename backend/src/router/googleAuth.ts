import express from 'express';
import handleRequest from '../controllers/oauth/handleRequest';
import googleOAuthCallback from '../controllers/oauth/googleOauthCallback';

const router = express.Router();

router.post('/', handleRequest);
router.get('/callback', googleOAuthCallback);

export default router;
