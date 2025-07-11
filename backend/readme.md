# Backend API Documentation

## User Routes

### Base URL: `/api/users`

#### 1. Register User

- **Endpoint:** `POST /`
- **Description:** Register a new user.
- **Request Body:**
  - `name` (string, required)
  - `email` (string, required)
  - `password` (string, required)
- **Response:**
  - Success: User object and authentication token
  - Error: Error message

#### 2. Login User

- **Endpoint:** `POST /login`
- **Description:** Log in an existing user.
- **Request Body:**
  - `email` (string, required)
  - `password` (string, required)
- **Response:**
  - Success: User object and authentication token
  - Error: Error message

#### 3. Logout User

- **Endpoint:** `POST /logout`
- **Description:** Log out the current user (invalidate token/session).
- **Request Body:** None
- **Response:**
  - Success: Confirmation message
  - Error: Error message

#### 4. Get User

- **Endpoint:** `GET /profile`
- **Description:** Get User profile from cookies.
- **Request Body:** None
- **Response:**
  - JSON: user details
  - Error: Error message

#### 5. Update User

- **Endpoint:** `PUT /profile`
- **Description:** update user profile.
- **Request Body:** Fill cheyali
- **Response:**
  - Fill Cheyali

---

## Restaurant Routes

### Base URL: `/api/restaurants`

#### 1. Get All Restaurants

- **Endpoint:** `GET /`
- **Description:** Retrieve a list of all restaurants.
- **Response:**
  - Success: Array of restaurant objects
  - Error: Error message

#### 2. Get Restaurant by ID

- **Endpoint:** `GET /:id`
- **Description:** Retrieve details for a specific restaurant.
- **Response:**
  - Success: Restaurant object
  - Error: Error message

---

## Order Routes

### Base URL: `/api/orders`

#### 1. Place Order

- **Endpoint:** `POST /`
- **Description:** Place a new order (authenticated users).
- **Request Body:**
  - `restaurantId` (string, required)
  - `items` (array, required)
- **Response:**
  - Success: Order object
  - Error: Error message

#### 2. Get User Orders

- **Endpoint:** `GET /myorders`
- **Description:** Get all orders for the authenticated user.
- **Response:**
  - Success: Array of order objects
  - Error: Error message

#### 3. Get analytics for Order

- **Endpoint:** `GET /analytics`
- **Description:** Get analytics for a user.
- **Response:**
  - Success: Order analytics
  - Error: Error message

---

All endpoints return JSON responses. Authentication is required for most user and order actions. Admin privileges are required for certain restaurant actions. Error responses include a message field describing the issue.
