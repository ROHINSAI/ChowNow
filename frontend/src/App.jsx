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
import AdminDashboard from "./components/admin/adminDashboard";
import UserDetails from "./components/admin/UserDetails";
import OwnerDetails from "./components/admin/OwnerDetails";
import EditRestaurant from "./pages/EditRestaurant";
import Fav from "./pages/Fav";
import AllOrders from "./pages/AllOrders";

const App = () => {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route element={<AppLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/menu/:id" element={<Menu />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signupowner" element={<SignUpOwner />} />

          <Route element={<PrivateRoute requiredRole="user" />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/fav" element={<Fav />} />
            <Route path="/user" element={<User />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
            <Route path="/Order" element={<Order />} />
          </Route>

          <Route element={<PrivateRoute requiredRole="owner" />}>
            <Route
              path="/restaurant-dashboard"
              element={<RestaurantDashboard />}
            />
            <Route path="/all-orders" element={<AllOrders />} />
            <Route path="/add-restaurant" element={<AddRestaurant />} />
            <Route path="/edit-restaurant" element={<EditRestaurant />} />
          </Route>

          {/* Restaurant admin Protected Routes */}
          <Route element={<PrivateRoute requiredRole="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/user/:id" element={<UserDetails />} />
            <Route path="/admin/owner/:id" element={<OwnerDetails />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
