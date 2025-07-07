import CategoryButton from "./CategoryButton";

const categories = [
  "Pizza",
  "Indian",
  "Fast Food",
  "Sushi",
  "Burgers",
  "Desserts",
  "Coffee",
];

const CategoryList = ({ onSelect }) => {
  return (
    <div className="flex flex-wrap gap-3 mt-4 ml-102">
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
