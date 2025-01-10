import express from 'express';
import { register, login, refreshToken, revokeRefreshTokens } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refreshToken', refreshToken);
router.post('/revokeRefreshTokens', revokeRefreshTokens);

export default router;