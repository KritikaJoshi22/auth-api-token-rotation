# Authentication API with Token Rotation

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)](https://www.mongodb.com/atlas)

A secure Express.js API demonstrating automated token rotation using cron jobs, JWT-like authentication, and MongoDB integration.

## 📌 Features

- **Hourly Token Rotation**: Cron job updates all user tokens every hour
- **Secure Authentication**:
  - Password hashing with bcrypt
  - Bearer token authentication
  - Protected endpoints
- **MongoDB Integration**: Scalable user data storage
- **RESTful API**:
  - User signup/login functionality
  - Protected resource access
  - Proper HTTP status codes

## 🛠 Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Security**: bcrypt, automated token rotation
- **Scheduling**: node-cron
- **Testing**: Postman

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x+
- MongoDB Atlas account
- Postman or similar API client

### Installation

1. **Clone Repository**

```bash
git clone https://github.com/KritikaJoshi22/auth-api-token-rotation.git
cd auth-api-token-rotation
```

2. **Install Dependencies**

```bash
npm install express mongoose bcrypt node-cron dotenv
```

3. **Configuration**
   Create `.env` file:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@your-cluster.mongodb.net/token-app?retryWrites=true&w=majority
PORT=3000
```

4. **Seed Database**

```bash
node seed.js
```

5. **Start Server**

```bash
node app.js
```

## 📂 Project Structure

```
auth-api-token-rotation/
├── config/
│   └── db.js           # Database configuration
├── models/
│   └── User.js         # User schema and model
├── routes/
│   ├── auth.js         # Authentication routes
│   └── protected.js    # Protected routes
├── services/
│   └── tokenUpdater.js # Token rotation service
├── middleware/
│   └── authMiddleware.js # Authentication middleware
├── seed.js             # Database seeding script
└── app.js              # Main application entry
```

## 🌐 API Endpoints

### Authentication

| Method | Endpoint     | Description       | Request Body                         |
| ------ | ------------ | ----------------- | ------------------------------------ |
| POST   | /auth/signup | User registration | `{ "username": "", "password": "" }` |
| POST   | /auth/login  | User login        | `{ "username": "", "password": "" }` |

### Protected Resources

| Method | Endpoint       | Description           | Headers                         |
| ------ | -------------- | --------------------- | ------------------------------- |
| GET    | /api/protected | Access protected data | `Authorization: Bearer <token>` |

## 🔒 Security Features

- **Password Hashing**: bcrypt with 10 salt rounds
- **Token Rotation**: All tokens invalidated hourly
- **Bearer Authentication**: Protected endpoints
- **No Sensitive Data Exposure**: Passwords never returned in responses

## 🧪 Testing Guide

### 1. User Registration

```http
POST http://localhost:3000/auth/signup
Content-Type: application/json

{
  "username": "test_user",
  "password": "secure_pass123"
}
```

### 2. User Login

```http
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "username": "test_user",
  "password": "secure_pass123"
}
```

### 3. Access Protected Route

```http
GET http://localhost:3000/api/protected
Authorization: Bearer <received-token>
```

### 4. Test Token Rotation

1. Wait 1 hour (or modify cron schedule temporarily)
2. Try protected route with old token (should fail)
3. Login again to get new token
