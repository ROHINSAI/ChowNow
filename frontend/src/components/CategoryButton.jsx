const CategoryButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-full bg-[#422121] text-[#f9dede] font-medium text-sm hover:opacity-90 transition"
    >
      {text}
    </button>
  );
};

export default CategoryButton;
