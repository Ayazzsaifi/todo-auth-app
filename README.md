# Todo Auth App

A backend TODO application with JWT-based authentication. Users can sign up, sign in, and manage their own todos through protected API routes.

## Features

- User signup and signin
- JWT-based authentication
- Protected routes (only accessible with a valid token)
- Create, read, update, and delete todos
- Mark todos as complete

## Tech Stack

- Node.js
- Express.js
- jsonwebtoken (JWT)
- dotenv

## API Routes

| Method | Route          | Description                  | Auth Required |
|--------|----------------|-------------------------------|----------------|
| POST   | /signup        | Register a new user           | No             |
| POST   | /signin        | Log in and receive a JWT      | No             |
| GET    | /todos         | Get all todos                 | Yes            |
| POST   | /todos         | Create a new todo             | Yes            |
| PUT    | /todos/:id     | Edit a todo or mark as done   | Yes            |
| DELETE |


## Security
- Passwords are hashed using bcrypt (via middleware) before being stored — plain text passwords are never saved.
- JWT is used for authentication after successful signin.