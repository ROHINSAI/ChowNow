import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!userInfo) {
    toast.error("You have to login to view this page");
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  const path = location.pathname;

  if (path.startsWith("/admin") && userInfo.role !== "admin") {
    toast.error("Unauthorized: Admin access only");
    return <Navigate to="/" />;
  }

  const userRoutes = [
    "/cart",
    "/fav",
    "/orderhistory",
    "/user",
    "/userdashboard",
  ];
  if (
    userRoutes.some((route) => path.startsWith(route)) &&
    !["user", "admin", "owner"].includes(userInfo.role)
  ) {
    toast.error("Unauthorized: User access only");
    return <Navigate to="/" />;
  }

  // Owner-only routes
  const ownerRoutes = [
    "/restaurant-dashboard",
    "/edit-restaurant",
    "/add-restaurant",
  ];
  if (
    ownerRoutes.some((route) => path.startsWith(route)) &&
    userInfo.role !== "owner"
  ) {
    toast.error("Unauthorized: Owner access only");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
