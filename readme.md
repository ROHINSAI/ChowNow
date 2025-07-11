# Things to Do

- Address Bar in SignUp Page - done but error handling is there i mean if there is no address show enter address

- Address in Cart Page - done

- AutoFill '/user' Page with Name, Phone, Email, Address - done but edit and delete feature for address is balance

- Order History -> Schema Changes, - done reorder functionality balance

'/user' UI changes, - done

- Order Analytics -> Total Orders, Total expenditure - done

- Dummy Order - done

- Default Avatar When Logged In - done but if profile updated and coming it's glitching for once and eventhough i upload profile url it is not showing photo

- Search Bar Implementation in Home Page - done

Rating + Review

- Favorites for Restaurants

- users
  - name
  - email
  - phone
  - address
  - password
  - createdAt
  - ordersHistory
  - role
  - restaurant-owned
- restaurants
  - name
  - description
  - location
    - lat
    - long
  - pictures
  - menu
    - cuisine-name
      - item-name
      - price
      - [rating-id]
      - [review-id]
      - discount
      - description
      - picture
      - numberOfRatings
  - contact
    - address
    - phone
    - email
- orders
  - restaurant-id
  - user-id
  - item-id
  - order-date
- rating for items
  - user-id
  - item-id
  - int
  - createdAt
- review for items
  - user-id
  - item-id
  - string
  - created-At

## Changes on 11 July Morning by Lokesh

- Seperated Slices and made them js file and moved them into store folder
- Commented Same Restaurant items cart adding because there is some logical error, will check later.
- orderModel.js -> Changed restaurant to ObjectID, removed \_id in items array, because it is auto generated in orderModel
- restaurantModel.js -> Removed \_id in restaurant, because it's not dynamic in nature, id it's a string, we should use uuid(), which is overhead
- userModel.js -> Added Favorite Restaurants in UserModel
- authMiddleware.js -> Removed Console.log in authMiddleware.js
- generateToken.js -> Made SameSite "Strict" in generateToken, added proxy in frontend to only `/api` routes as solution.
- userController.js -> Made a passwordMatch variable in userController.loginUser because I have OCD in Coding, added return for all res for the same reason
- restaurantController.js -> Added `.lean()` in getAllRestaurants because it's directly sent as json, added console.log when an error comes, added return keyword, added getRestaurant by Id
- restaurantRoutes.js -> Added route for one restaurant
- orderController.js -> Added `.lean()` in getMyOrders because it's directly sent as json, populated restaurant name, location, description, pictures, contact to display in frontend
- orderRoutes.js -> If I had too much OCD i would have added `router.use(protect)` and removed protect in each route, but I didn't
- /backend/readme.md -> Made gpt to add the documentation for routes
- That summarizes changes in backend, now we will move to frontend :\)
- cartSlice.js -> commented same restaurant check, changed variable name to initialStateCart due to OCD
- store.js -> changed function variable names to saveCart and loadCart prefix
- authSlice.js -> changed intialState to initialStateAuth, removed async thunk for automatic user login, for now we can make it using useEffect, the problem is I didn't add backend route to get user based on cookie yet, removed storing userInfo in local Storage
- MenuSlice.js -> deleted because it's not used anywhere
- Header.jsx -> removed `dispatch(fetchUserProfile)` will implement it later using useEffect
- Home.jsx -> commented `Featured Restaurants` and `Top Rated Near you` for testing purpose, removed `restaurantsData` from json because backend is ready
- Cart.jsx -> Removed fetchUserProfile related things
- Modal.jsx -> Removed fetchUserProfile related things
- okay , here here is why, why are we fetching the user multiple times in alot of pages, just fetch once, store in the state and use selector
- RestaurantsCarousel.jsx -> commented restaurant.avg_ratings.toFixed(), cause we don't have avg_ratings yet, chnaged restaurant.id route to restaurant.\_id
- Home.jsx -> Fetched Restaurant details from MongoDB, Fetched user details from backend and saved it in store
- Menu.jsx -> Made changes according to fetched restaurant, setRestaurantId on click
- cartSlice.js -> Added setRestaurantId, clearRestaurantId, changed items to array, because if it is object we need to have to key for every item included, so made changes in the reducer according to the item
- Made changes in other jsx files, to replace photo with picture
- Deleted Existing Orders in database.
- Info and Reviews from Backend, Added getReviewsRatings controller.
- Removed setRestaurantId, clearRestaurantId in cartSlide, implemented cannot add cart item when already different restaurant is present.
- Deleted cookie on logout
<!--  -->
