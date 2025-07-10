# Things to Do

- Search Bar Implementation in Home Page

- Address Bar in SignUp Page - done but error handling is there i mean if there is no address show enter address

- Default Avatar When Logged In - done but if profile updated and coming it's glitching for once and eventhough i upload profile url it is not showing photo

- Address in Cart Page - done

- AutoFill '/user' Page with Name, Phone, Email, Address - done but edit and delete feature for address is balance

- Favorites for Restaurants

- Order History -> Schema Changes, - done, in order.jsx it renders all orders but displays only latest one

'/user' UI changes,

Rating + Review

- Order Analytics -> Total Orders, Total expenditure

- Dummy Order - done

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
