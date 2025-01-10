import express from 'express';
import { createPostController, getAllPostsController, getPostByIdController } from '../controllers/user.controller';
import { isAuthenticated } from '../middleware/middleware';

const router = express.Router();

router.post('/create', isAuthenticated, createPostController);
router.get('/all', getAllPostsController);
router.get('/:id', getPostByIdController);

export default router;