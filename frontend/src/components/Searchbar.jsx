import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  variant = "bar",
  value,
  onChange,
  onSubmit,
  placeholder = "Search",
  className = "",
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  const handleChange = (e) => {
    setInputValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit(inputValue);
  };

  const baseClasses =
    "flex items-center bg-[#552727] text-[#f9dede] rounded-xl px-4 py-2 font-medium";
  const sizeClasses =
    variant === "bar"
      ? "w-full max-w-2xl"
      : variant === "inline"
      ? "w-60"
      : "w-40";

  const searchInput = (
    <form
      onSubmit={handleSubmit}
      className={`${baseClasses} ${sizeClasses} ${className}`}
    >
      <FaSearch className="mr-2 text-[#f9dede]" />
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="bg-transparent focus:outline-none w-full text-sm placeholder-[#f9dede]"
      />
    </form>
  );

  if (variant === "bar") {
    return <div className="flex justify-center my-4">{searchInput}</div>;
  }

  return searchInput;
};

export default SearchBar;
