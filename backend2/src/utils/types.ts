import { User } from '@prisma/client';  

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export interface JwtPayload {
    id: number;
    username: string;
    password: string;
  }  