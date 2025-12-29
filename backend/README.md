# Chatme Backend

## Introduction

Chatme is a real-time messaging application designed to provide seamless communication between users. This repository contains the backend source code, built with a focus on scalability, maintainability, and clean code practices.
**Backend URL**: `http://localhost:3000` (Default for local development)

## Tech Stack

The backend is built using the following technologies:

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Dependency Injection**: InversifyJS
- **Validation**: Zod
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt
- **Utilities**: Dotenv, CORS, UUID

## Clean Architecture

This project implements **Clean Architecture** to ensure separation of concerns and independence of frameworks. The codebase is organized into four main layers:

1.  **Domain Layer** (`src/domain`): Contains enterprise business rules, entities, and repository interfaces. It is independent of any external agency.
2.  **Application Layer** (`src/application`): Contains application business rules (Use Cases) and DTOs. It orchestrates the flow of data to and from the entities.
3.  **Infrastructure Layer** (`src/infrastructure`): Contains implementations of the interfaces defined in the domain layer (e.g., Repositories, Mongoose Models, Mappers).
4.  **API Layer** (`src/api`): Contains the web framework (Express), controllers, routers, and request/response handling logic.
5.  **DI Layer** (`src/di`): Handles dependency injection configuration using InversifyJS to wire up all components.

## API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint         | Description          | Request Body                    |
| :----- | :--------------- | :------------------- | :------------------------------ |
| `POST` | `/signup`        | Register a new user  | `{ username, email, password }` |
| `POST` | `/login`         | Login user           | `{ email, password }`           |
| `POST` | `/refresh-token` | Refresh access token | `{ refreshToken }`              |

### Profile (`/api/profile`)

| Method   | Endpoint  | Description                 | Request Body                              |
| :------- | :-------- | :-------------------------- | :---------------------------------------- |
| `GET`    | `/me`     | Get current user profile    | -                                         |
| `PATCH`  | `/me`     | Update current user profile | `{ username?, bio?, profilePictureUrl? }` |
| `DELETE` | `/me`     | Delete current user account | -                                         |
| `GET`    | `/search` | Search profiles             | Query params (e.g., `?q=username`)        |
| `GET`    | `/:id`    | Get profile by ID           | -                                         |

### Rooms (`/api/rooms`)

| Method | Endpoint        | Description              | Request Body                                          |
| :----- | :-------------- | :----------------------- | :---------------------------------------------------- |
| `POST` | `/`             | Create a new room        | `{ memberIds: string[], type: "private" \| "group" }` |
| `GET`  | `/`             | Get current user's rooms | -                                                     |
| `GET`  | `/:id`          | Get room details by ID   | -                                                     |
| `POST` | `/:id/messages` | Send a message to a room | `{ text }`                                            |
| `GET`  | `/:id/messages` | Get messages from a room | -                                                     |

### Messages (`/api/messages`)

| Method   | Endpoint      | Description           | Request Body                                  |
| :------- | :------------ | :-------------------- | :-------------------------------------------- |
| `GET`    | `/:id`        | Get message by ID     | -                                             |
| `PATCH`  | `/:id`        | Update message text   | `{ text }`                                    |
| `PATCH`  | `/:id/status` | Update message status | `{ status: "sent" \| "delivered" \| "read" }` |
| `DELETE` | `/:id`        | Delete a message      | -                                             |

## Setup and Configuration

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB (running locally or cloud URI)

### Installation

1.  **Clone the repository**:

    ```bash
    git clone <repository_url>
    cd backend
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory and configure the following:

    ```env
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/chatme
    JWT_SECRET=your_jwt_secret
    JWT_REFRESH_SECRET=your_jwt_refresh_secret
    ```

4.  **Run the application**:
    - Development mode (with hot reload):
      ```bash
      npm run dev
      ```
    - Production build:
      ```bash
      npm run build
      npm start
      ```

## Tools Used

- **InversifyJS**: For implementing Dependency Injection to decouple components and make testing easier.
- **Zod**: For robust schema validation of runtime data to ensure API inputs are correct.
- **Mongoose**: To model application data and interact with the MongoDB database.
- **TypeScript**: For static typing, which improves code quality and developer experience.
