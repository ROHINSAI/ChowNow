import RoundedButton from "./Button";
import SearchBar from "./Searchbar";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const isHome = path === "/";

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-700/50">
      {/* Left: Logo + Search */}
      <div className="flex items-center space-x-4">
        <div className="text-xl font-bold">ChowNow</div>
        <SearchBar variant="inline" />
      </div>

      {/* Right: Buttons */}
      <div className="flex items-center space-x-4">
        {isHome ? (
          <>
            <RoundedButton
              text="Cart"
              to="/cart"
              bgColor="bg-red-600"
              textColor="text-white"
            />
            <RoundedButton
              text="Login"
              to="/login"
              bgColor="bg-[#422121]"
              textColor="text-[#f9dede]"
            />
          </>
        ) : (
          <RoundedButton
            text="Home"
            to="/"
            bgColor="bg-[#422121]"
            textColor="text-[#f9dede]"
          />
        )}
      </div>
    </header>
  );
}

export default Header;
