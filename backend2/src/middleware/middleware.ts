import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../utils/types'; 

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET || '57745DECFC0FD57F7345FBDF199DF779D1ACFE1E81D6F53776B8C7F98F394180') as JwtPayload;

    req.user = payload; 
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
