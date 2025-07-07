import CategoryList from "../components/CategoryList";
import RestaurantCarousel from "../components/RestaurantsCarousel";
import SearchBar from "../components/Searchbar";

function Home() {
  return (
    <div>
      <SearchBar variant="bar" />
      <CategoryList />
      <RestaurantCarousel title="Featured Restaurants" />
      <RestaurantCarousel title="Top Rated Near You" />
      <RestaurantCarousel title="All Restaurants" />
    </div>
  );
}

export default Home;
