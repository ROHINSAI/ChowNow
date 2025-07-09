# User Routes Documentation

## Base URL: `/api/users`

### 1. Register User
- **Endpoint:** `POST /`
- **Description:** Register a new user.
- **Request Body:**
  - `name` (string, required)
  - `email` (string, required)
  - `password` (string, required)
- **Response:**
  - Success: User object and authentication token
  - Error: Error message

### 2. Login User
- **Endpoint:** `POST /login`
- **Description:** Log in an existing user.
- **Request Body:**
  - `email` (string, required)
  - `password` (string, required)
- **Response:**
  - Success: User object and authentication token
  - Error: Error message

### 3. Logout User
- **Endpoint:** `POST /logout`
- **Description:** Log out the current user (invalidate token/session).
- **Request Body:**
  - None
- **Response:**
  - Success: Confirmation message
  - Error: Error message

---

All endpoints return JSON responses. Authentication may be required for certain actions.
