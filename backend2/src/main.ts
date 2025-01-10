import express from 'express';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';

const app = express();
export const prisma = new PrismaClient();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
