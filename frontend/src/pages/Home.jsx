import { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";
import RestaurantCarousel from "../components/RestaurantsCarousel";
import SearchBar from "../components/Searchbar";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [restaurantsData, setRestaurantsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [restaurantStats, setRestaurantStats] = useState([]);

  const handleSearchSubmit = (value) => {
    setSearchTerm(value);

    const filtered = restaurantsData.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(filtered);
  };

  const handleCategorySelect = (category) => {
    setSearchTerm(category);

    console.log("Selected category:", category);
    const filtered = restaurantsData.filter((restaurant) =>
      restaurant.menu.some(
        (menu) =>
          new RegExp(category, "i").test(menu.cuisine) ||
          menu.items.some((item) =>
            new RegExp(category, "i").test(item.name)
          )
      )
    );
    setSearchResults(filtered);
  };

  useEffect(() => {
    const fetchRestaurantsData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/restaurants"
        );
        const responseStats = await fetch(
          "http://localhost:3000/api/users/restaurantStats"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        if (!responseStats.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const stats = await responseStats.json();
        console.log("Fetched restaurants data:", data);
        console.log("Fetched restaurants stats:", stats);
        setRestaurantsData(data);
        setRestaurantStats(stats);
      } catch (error) {
        console.error("Failed to fetch restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantsData();
  }, []);

  return (
    <div>
      <SearchBar
        variant="bar"
        value={searchTerm}
        onSubmit={handleSearchSubmit}
      />

      {searchTerm ? (
        <RestaurantCarousel
          title={`Search Results for "${searchTerm}"`}
          restaurants={searchResults}
          stats={restaurantStats}
        />
      ) : (
        <>
          <CategoryList onSelect={handleCategorySelect} />
          {loading ? (
            <div className="text-white text-center mt-8 ">
              Loading restaurants...
            </div>
          ) : (
            <>
              <RestaurantCarousel
                title="Featured Restaurants"
                restaurants={restaurantsData}
                stats={restaurantStats}
              />
              <RestaurantCarousel
                title="Top Rated Near You"
                restaurants={restaurantsData}
                stats={restaurantStats}
              />
              <RestaurantCarousel
                title="All Restaurants"
                restaurants={restaurantsData}
                stats={restaurantStats}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
