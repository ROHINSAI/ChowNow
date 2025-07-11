import { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import RestaurantCarousel from "../components/RestaurantsCarousel";
import SearchBar from "../components/Searchbar";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchSubmit = (value) => {
    setSearchTerm(value);

    const filtered = restaurantsData.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(filtered);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/restaurants");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched restaurants data:", data);
        setRestaurantsData(data);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

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
          {loading ? (
            <div className="text-white text-center mt-8">
              Loading restaurants...
            </div>
          ) : (
            // <RestaurantCarousel title="Featured Restaurants" />
            //<RestaurantCarousel title="Top Rated Near You" />
            <RestaurantCarousel
              title="All Restaurants"
              restaurants={restaurantsData}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Home;
