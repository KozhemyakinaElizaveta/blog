import jwt from 'jsonwebtoken';

export const generateTokens = (user: { id: number, username: string }) => {
  const accessToken = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_ACCESS_SECRET || 'your-secret-key',
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};
