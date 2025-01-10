import express from 'express';
import { createPostController, deletePostController, getAllPostsController, getPostByIdController, getPostsByUserIdController } from '../controllers/user.controller';
import { isAuthenticated } from '../middleware/middleware';

const router = express.Router();

router.post('/create', isAuthenticated, createPostController);
router.get('/all', getAllPostsController);
router.get('/:id', getPostByIdController);
router.get('/user/:userId', isAuthenticated, getPostsByUserIdController);
router.delete('/:id', isAuthenticated, deletePostController);

export default router;