import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import PrivateRoute from "./components/PrivateRoute";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import User from "./pages/User";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Order from "./pages/Order";
import OrderHistory from "./pages/OrderHistory";
import UserDashboard from "./pages/UserDashboard";
import SignUpOwner from "./pages/SignUpOwner";
import RestaurantDashboard from "./pages/RestaurantDashboard";
import AddRestaurant from "./pages/AddRestaurant";
import EditRestaurant from "./pages/EditRestaurant";

const App = () => {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu/:id" element={<Menu />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signupowner" element={<SignUpOwner />} />
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/user" element={<User />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/Order" element={<Order />} />
            <Route path="/edit-restaurant" element={<EditRestaurant />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
            <Route
              path="/restaurant-dashboard"
              element={<RestaurantDashboard />}
            />
            <Route path="/add-restaurant" element={<AddRestaurant />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
