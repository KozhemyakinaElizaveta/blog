import express from 'express';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes';
import postRoutes from './routes/post.routes';

const app = express();
const cors = require('cors');
export const prisma = new PrismaClient();

app.use(cors({
  origin: ['https://kozhemyakinaelizaveta.github.io'], 
  credentials: true,
}));

app.options('*', cors());

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
