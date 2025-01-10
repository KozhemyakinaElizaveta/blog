import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { findUserByUsername, createUserByUsernameAndPassword, findUserById } from '../services/services';
import { generateTokens } from '../utils/auth';
import { addRefreshTokenToWhitelist, findRefreshToken, revokeTokens } from '../services/services';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const existingUser = await findUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({ message: 'Username already in use.' });
    }

    const newUser = await createUserByUsernameAndPassword(username, password);
    const { accessToken, refreshToken } = generateTokens(newUser);

    await addRefreshTokenToWhitelist({ refreshToken, userId: newUser.id });

    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(403).json({ message: 'Invalid credentials.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Invalid credentials.' });
    }

    const { accessToken, refreshToken } = generateTokens(user);
    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ message: 'Missing refresh token.' });
      }
  
      const savedRefreshToken = await findRefreshToken(refreshToken);
  
      if (!savedRefreshToken || savedRefreshToken.revoked === true || Date.now() >= savedRefreshToken.expireAt.getTime()) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const username = await findUserById(savedRefreshToken.userId);
      if (!username) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
    } catch (err) {
      next(err);
    }
  };
  

export const revokeRefreshTokens = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }

    await revokeTokens(userId);
    res.json({ message: `Tokens revoked for user with id #${userId}` });
  } catch (err) {
    next(err);
  }
};
