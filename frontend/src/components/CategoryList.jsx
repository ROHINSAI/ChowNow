import CategoryButton from "./CategoryButton";

const categories = [
  "Chicken",
  "Indian",
  "Paneer",
  "Sushi",
  "Biryani",
  "Desserts",
  "Coffee",
];

const CategoryList = ({ onSelect }) => {
  return (
    <div className="flex justify-center gap-3 mt-4">
      {categories.map((category) => (
        <CategoryButton
          key={category}
          text={category}
          onClick={() => onSelect && onSelect(category)}
        />
      ))}
    </div>
  );
};

export default CategoryList;
