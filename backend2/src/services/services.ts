import { prisma } from '../../src/main';
import bcrypt from 'bcrypt';

export const createPost = async ({ message, date, authorId }: { message: string, date: string, authorId: number }) => {
    return await prisma.post.create({
      data: {
        message,
        date,
        authorId,
      },
    });
  };

  export const getAllPosts = async () => {
    return await prisma.post.findMany();
  };

  export const getPostById = async (id: string) => {
    return await prisma.post.findUnique({
      where: { id: parseInt(id) }, 
    });
  };

export const addRefreshTokenToWhitelist = async ({ refreshToken, userId }: { refreshToken: string, userId: number }) => {
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: userId,
      expireAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
  });
};

export const findRefreshToken = async (refreshToken: string) => {
  return await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
};

export const deleteRefreshTokenById = async (id: number) => {
  return await prisma.refreshToken.delete({ where: { id } });
};

export const revokeTokens = async (userId: number) => {
  await prisma.refreshToken.updateMany({
    where: { userId },
    data: { revoked: true },
  });
};

export const findUserByUsername = async (username: string) => {
    return await prisma.user.findUnique({
      where: { username },
    });
  };

  export const findUserById = async (userId: number) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (user) {
      return user.username;
    }
    return null;
  };
  
  export const createUserByUsernameAndPassword = async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  };

  export const getPostsByUserId = async (userId: number) => {
    return await prisma.post.findMany({
      where: { authorId: userId },
    });
  };

  export const deletePost = async (id: string) => {
    return await prisma.post.delete({
      where: { id: parseInt(id) },
    });
  };