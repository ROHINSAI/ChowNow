import RoundedButton from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useSelector, useDispatch } from "react-redux";

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const isHome = path === "/";
  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = Object.keys(cartItems).length;
  const { userInfo } = useSelector((state) => state.auth);
  console.log("userInfo in Header:", userInfo);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await fetch("http://localhost:3000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileClick = () => {
    try {
      navigate("/user");
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
  };

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-700/50">
      {/* Left: Logo + Search */}
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold">ChowNow</div>
        {/* <SearchBar variant="inline" /> */}
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center space-x-4">
        {isHome ? (
          <>
            <RoundedButton
              text={`Cart (${cartItemCount})`}
              to="/cart"
              bgColor="bg-red-600"
              textColor="text-white"
            />
            {userInfo ? (
              <div className="flex items-center space-x-4">
                <img
                  src={userInfo.photo}
                  alt={userInfo.name || "User Avatar"}
                  className="w-10 h-10 rounded-full object-cover"
                  onClick={handleProfileClick}
                />
                <button
                  onClick={logoutHandler}
                  className="text-white hover:text-blue-500 hover:cursor-pointer"
                >
                  Logout
                </button>
                {userInfo.role == "owner" && (
                  <>
                    <RoundedButton
                      text="Dashboard"
                      to="/restaurant-dashboard"
                      bgColor="bg-blue-600"
                      textColor="text-white"
                    />
                    <RoundedButton
                      text="Add Restaurant"
                      to="/add-restaurant"
                      bgColor="bg-green-600"
                      textColor="text-white"
                    />
                  </>
                )}
              </div>
            ) : (
              <RoundedButton
                text="Login"
                to="/signin"
                bgColor="bg-[#422121]"
                textColor="text-[#f9dede]"
              />
            )}
          </>
        ) : (
          <>
            <>
              {cartItemCount > 0 && (
                <RoundedButton
                  text={`Cart (${cartItemCount})`}
                  to="/cart"
                  bgColor="bg-red-600"
                  textColor="text-white"
                />
              )}
            </>
            <RoundedButton
              text="Home"
              to="/"
              bgColor="bg-[#422121]"
              textColor="text-[#f9dede]"
            />
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
