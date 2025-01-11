
# Documentation

**Server Deployment**: [blog-z5et.onrender.com](https://blog-z5et.onrender.com)

**Frontend Deployment**: [kozhemyakinaelizaveta.github.io/blog](https://kozhemyakinaelizaveta.github.io/blog)

## Project Overview
This project is a backend service for a blogging platform. It provides authentication, user management, and post creation functionalities. The backend uses **TypeScript**, **Express.js**, **Prisma** (with a PostgreSQL database), and **JWT** for secure token-based authentication.

## Features
1. **User Authentication**: Register, login, and token-based authentication.
2. **Refresh Token Management**: Handling token refreshing and revocation.
3. **Post Management**: Create, retrieve, and delete posts.

---

## Project Structure
```
backend2/
├── prisma/
│   ├── migrations/     # Database migration files
│   ├── schema.prisma   # Prisma schema defining models and datasource
├── src/
│   ├── controllers/    # Handles HTTP request logic
│   │   ├── auth.controller.ts  # Auth-related controllers
│   │   └── user.controller.ts  # Post-related controllers
│   ├── middleware/     # Middleware functions (e.g., authentication)
│   ├── models/         # Type definitions (interfaces)
│   ├── routes/         # API route definitions
│   │   ├── auth.routes.ts  # Auth routes
│   │   └── post.routes.ts  # Post routes
│   ├── services/       # Business logic and database interactions
│   ├── utils/          # Utility functions (e.g., auth helpers)
│   └── main.ts         # Application entry point
├── .env                # Environment variables
├── docker-compose.yml  # Docker configuration (if applicable)
└── package.json        # Project dependencies and scripts
```

---

## Installation and Setup

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd backend2
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the environment variables in `.env`:
   ```env
   DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
   JWT_ACCESS_SECRET=<access-token-secret>
   JWT_REFRESH_SECRET=<refresh-token-secret>
   ```
4. Run migrations and generate Prisma client:
   ```sh
   npm run setup
   ```
5. Start the server:
   ```sh
   npm start
   ```

---

## API Documentation

### Authentication Routes

| Method | Endpoint           | Description              |
|--------|-------------------|--------------------------|
| POST   | `/api/auth/register`  | Register a new user      |
| POST   | `/api/auth/login`     | Log in a user            |
| POST   | `/api/auth/refreshToken` | Refresh an access token  |
| POST   | `/api/auth/logout`    | Log out a user           |
| POST   | `/api/auth/revokeRefreshTokens` | Revoke refresh tokens |

#### Example: Register a User
**Request**:
```json
{
  "username": "john_doe",
  "password": "securepassword"
}
```
**Response**:
```json
{
  "accessToken": "<token>",
  "refreshToken": "<token>"
}
```

### Post Routes

| Method | Endpoint               | Description             |
|--------|-----------------------|-------------------------|
| POST   | `/api/posts/create`      | Create a new post       |
| GET    | `/api/posts/all`         | Get all posts           |
| GET    | `/api/posts/:id`         | Get post by ID          |
| GET    | `/api/posts/user/:userId` | Get posts by user ID    |
| DELETE | `/api/posts/:id`         | Delete a post by ID     |

#### Example: Create a Post
**Request**:
```json
{
  "message": "Hello, world!",
  "date": "2025-01-11",
  "authorId": 1
}
```
**Response**:
```json
{
  "id": 1,
  "message": "Hello, world!",
  "date": "2025-01-11",
  "authorId": 1
}
```

---

## Middleware

### Authentication Middleware
`isAuthenticated` verifies the access token from the `Authorization` header.
```ts
import jwt from 'jsonwebtoken';

export const isAuthenticated = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
```

---

## Models (Prisma)

### User Model
```prisma
model User {
  id           Int           @id @default(autoincrement())
  username     String        @unique
  password     String
  posts        Post[]
  refreshTokens RefreshToken[]
}
```

### Post Model
```prisma
model Post {
  id       Int    @id @default(autoincrement())
  message  String
  date     String
  authorId Int
  author   User   @relation(fields: [authorId], references: [id])
}
```

### RefreshToken Model
```prisma
model RefreshToken {
  id        Int      @id @default(autoincrement())
  token     String   @unique
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
  expireAt  DateTime
  revoked   Boolean  @default(false)
}
```

---

## Utility Functions
### Token Generation (utils/auth.ts)
`generateTokens` creates JWT access and refresh tokens.

### Password Hashing
`createUserByUsernameAndPassword` hashes passwords using bcrypt.

---

## Docker
1. Ensure Docker is installed.
2. Use `docker-compose.yml` to configure the environment.
3. Run:
   ```sh
   docker-compose up
   ```

---

## Notes
- Make sure environment variables are securely stored.
- Prisma migrations must be updated when models are changed.