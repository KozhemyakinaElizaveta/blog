import { Request, Response, NextFunction } from 'express';
import { createPost, deletePost, getAllPosts, getPostById, getPostsByUserId } from '../services/services';

export const createPostController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, date, authorId } = req.body;

    if (!message || !date || !authorId) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const post = await createPost({ message, date, authorId });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const getAllPostsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const getPostByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const post = await getPostById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const getPostsByUserIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const posts = await getPostsByUserId(parseInt(userId, 10));
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const deletePostController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Post ID is required.' });
    }
    await deletePost(id);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Error in deletePostController:', err);
    next(err);
  }
};