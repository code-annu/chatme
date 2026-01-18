# Chatme Backend

## 1. Introduction

Chatme Backend is the robust, scalable server-side application for the Chatme messaging platform. Built with modern practices, it provides a secure and efficient API for real-time messaging, user authentication, and room management. It serves as the core logic handler, bridging the database with the client applications.

## 2. Base URL

- **Local Development**: `http://localhost:3000`
- **API Prefix**: All API endpoints are prefixed with `/api`.
  - Example: `http://localhost:3000/api/auth/login`

## 3. Technology Stack & Tools

We chose a modern, type-safe, and modular stack to ensure scalability and maintainability.

| Tool                   | Purpose              | Why It's Used                                                                        |
| ---------------------- | -------------------- | ------------------------------------------------------------------------------------ |
| **Node.js & Express**  | Runtime & Framework  | High performance, non-blocking I/O ideal for real-time apps.                         |
| **TypeScript**         | Language             | Static typing prevents runtime errors and improves developer experience.             |
| **InversifyJS**        | Dependency Injection | Enables **Clean Architecture** by managing dependencies and decoupling layers.       |
| **MongoDB & Mongoose** | Database             | Flexible schema design, perfect for storing chat messages and rapidly evolving data. |
| **Zod**                | Validation           | Runtime request validation ensuring data integrity before it reaches controllers.    |
| **JWT & Bcrypt**       | Security             | Standard secure authentication and password hashing.                                 |
| **Dotenv**             | Configuration        | Environment variable management for secure configuration.                            |

## 4. Clean Architecture

This project strictly follows **Clean Architecture** principles to ensure separation of concerns and testability.

### Layers:

1.  **Domain Layer** (`src/domain`):
    - **Core Entities**: `User`, `Message`, `Room`.
    - **Repository Interfaces**: Contracts for data access (e.g., `IUserRepository`).
    - **Enterprise Logic**: Independent of frameworks and external tools.
2.  **Application Layer** (`src/application`):
    - **Use Cases**: Specific business rules (e.g., `SendMessageToUserUsecase`, `LoginUsecase`).
    - **DTOs**: Data Transfer Objects defining data shape input/output.
    - Contains the _business logic_ of the application.
3.  **API Layer** (`src/api`):
    - **Controllers**: Handle HTTP requests, call Use Cases, and return responses.
    - **Routers**: Define API endpoints.
    - **Middlewares**: Auth checks, error handling, validation.
    - **Schemas**: Zod validation schemas.
4.  **Infrastructure Layer** (`src/infrastructure`):
    - **Repository Implementations**: Concrete database operations (Mongoose models).
    - **Configuration**: DB connection, external services.

**Dependency Rule**: Outer layers depend on inner layers. The Domain layer depends on nothing.

## 5. Features

- **Authentication**: Signup, Login, Refresh Token (JWT-based).
- **Profile Management**: View and update user profiles.
- **Messaging**:
  - Send/Receive messages (1-on-1 and Rooms).
  - Message status updates (Sent, Delivered, Read).
  - Edit and Delete messages.
- **Room Management**:
  - Create/View rooms.
  - specialized support for private (1-on-1) chats.

## 6. API Endpoints Guide

### **Authentication** (`/api/auth`)

| Method | Endpoint         | Description          | Request Body                                                  |
| :----- | :--------------- | :------------------- | :------------------------------------------------------------ |
| `POST` | `/signup`        | Register new user    | `{ firstName, lastName?, email, password, avatarUrl?, bio? }` |
| `POST` | `/login`         | User login           | `{ email, password }`                                         |
| `POST` | `/refresh-token` | Refresh access token | `{ token }` (Refresh token)                                   |

### **Profile** (`/api/profile`)

_Requires Authorization Header: `Bearer <access_token>`_
| Method | Endpoint | Description | Request Body |
|:-------|:---------|:------------|:-------------|
| `GET` | `/` | Get current user's profile | - |
| `GET` | `/:id` | Get public profile by ID | - |
| `PATCH` | `/` | Update profile | `{ firstName?, lastName?, bio?, avatarUrl? }` |
| `DELETE` | `/` | Delete account | - |

### **Messages** (`/api/messages`)

_Requires Authorization Header: `Bearer <access_token>`_
| Method | Endpoint | Description | Request Body |
|:-------|:---------|:------------|:-------------|
| `POST` | `/` | Send Message to User | `{ receiverId, text }` |
| `GET` | `/:messageId` | Get single message | - |
| `PATCH` | `/:messageId` | Edit message | `{ text }` |
| `DELETE` | `/:messageId` | Delete message | - |
| `PATCH` | `/:messageId/status` | Update status | `{ status }` (pending/sent/delivered/read) |

### **Rooms** (`/api/rooms`)

_Requires Authorization Header: `Bearer <access_token>`_
| Method | Endpoint | Description | Request Body |
|:-------|:---------|:------------|:-------------|
| `GET` | `/` | Get user's rooms (chat list) | - |
| `GET` | `/:roomId` | Get room details | - |
| `POST` | `/:roomId/messages` | Send message to Room | `{ text }` |
| `GET` | `/:roomId/messages` | Get room history | - |

## 7. Setup & Installation

1.  **Clone the repository** and navigate to `backend`:

    ```bash
    cd backend
    ```

2.  **Install Dependencies**:

    ```bash
    npm install
    ```

3.  **Environment Configuration**:
    Create a `.env` file in the root directory:

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/chatme
    ACCESS_TOKEN_SECRET=your_access_secret
    REFRESH_TOKEN_SECRET=your_refresh_secret
    ACCESS_TOKEN_EXPIRY=15m
    REFRESH_TOKEN_EXPIRY=7d
    ```

4.  **Run Development Server**:

    ```bash
    npm run dev
    ```

    The server will start at `http://localhost:3000`.

5.  **Build for Production**:
    ```bash
    npm run build
    npm start
    ```
