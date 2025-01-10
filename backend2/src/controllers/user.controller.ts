import { Request, Response, NextFunction } from 'express';
import { createPost, getAllPosts, getPostById } from '../services/services';

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
