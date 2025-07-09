import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEffect } from "react";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      toast.error("You must be logged in to view this page.");
    }
  }, [userInfo]);

  return userInfo ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace />
  );
};
export default PrivateRoute;
