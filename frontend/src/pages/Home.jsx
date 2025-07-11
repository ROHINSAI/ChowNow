import { useState } from "react";
import CategoryList from "../components/CategoryList";
import RestaurantCarousel from "../components/RestaurantsCarousel";
import SearchBar from "../components/Searchbar";
import restaurantsData from "../data/restaurants.json";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchSubmit = (value) => {
    setSearchTerm(value);

    const filtered = restaurantsData.filter((restaurant) =>
      restaurant.restaurant_name.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(filtered);
  };

  return (
    <div>
      <SearchBar
        variant="bar"
        value={searchTerm}
        onSubmit={handleSearchSubmit}
      />

      {/* Show search results if there is a search term */}
      {searchTerm ? (
        <RestaurantCarousel
          title={`Search Results for "${searchTerm}"`}
          restaurants={searchResults}
        />
      ) : (
        <>
          <CategoryList />
          <RestaurantCarousel title="Featured Restaurants" />
          <RestaurantCarousel title="Top Rated Near You" />
          <RestaurantCarousel title="All Restaurants" />
        </>
      )}
    </div>
  );
}

export default Home;
