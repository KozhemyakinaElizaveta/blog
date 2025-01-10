import jwt from 'jsonwebtoken';

export const generateTokens = (user: { id: number, username: string }) => {
  const accessToken = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_ACCESS_SECRET || '57745DECFC0FD57F7345FBDF199DF779D1ACFE1E81D6F53776B8C7F98F394180',
    { expiresIn: '1h' }
  );

  const refreshToken = jwt.sign(
    { userId: user.id, username: user.username },
    process.env.JWT_REFRESH_SECRET || '57745DECFC0FD57F7345FBDF199DF779D1ACFE1E81D6F53776B8C7F98F394180',
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};
