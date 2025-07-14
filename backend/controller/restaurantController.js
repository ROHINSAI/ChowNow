const Restaurant = require("../model/restaurantModel");
const Rating = require("../model/restaurantRatingModel");
const Review = require("../model/restaurantReviewModel");

const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({}).lean();
    return res.status(200).json(restaurants);
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getRestaurantById = async (req, res) => {
  const { id } = req.params;
  try {
    const restaurant = await Restaurant.findById(id).lean();
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    return res.status(200).json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getRestaurantRatingsReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const ratings = await Rating.find({
      restaurant: id,
    })
      .populate("user", "name")
      .select("user rating")
      .lean();
    const reviews = await Review.find({
      restaurant: id,
    })
      .populate("user", "name")
      .select("user review")
      .lean();
    return res.status(200).json({ ratings, reviews });
  } catch (error) {
    console.error("Error fetching ratings and reviews:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
const addRestaurantByOwner = async (req, res) => {
  try {
    const { name, description, location, pictures, contact, menu } = req.body;

    const newRestaurant = new Restaurant({
      name,
      description,
      location,
      pictures,
      contact,
      menu,
    });

    const savedRestaurant = await newRestaurant.save();

    // Link restaurant to the owner
    req.user.restaurantOwned = savedRestaurant._id;
    await req.user.save();

    res.status(201).json(savedRestaurant);
  } catch (err) {
    console.error("Add Restaurant Error:", err);
    res.status(500).json({ message: "Failed to create restaurant" });
  }
};

const getMyRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.user.restaurantOwned);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch restaurant" });
  }
};

const updateMyRestaurant = async (req, res) => {
  try {
    const user = req.user;
    const restaurant = await Restaurant.findById(user.restaurantOwned);
    if (!restaurant)
      return res.status(404).json({ message: "Restaurant not found" });

    const { name, description, location, pictures, contact, menu } = req.body;

    restaurant.name = name || restaurant.name;
    restaurant.description = description || restaurant.description;
    restaurant.location = {
      lat: location?.lat || restaurant.location.lat,
      long: location?.long || restaurant.location.long,
    };
    restaurant.pictures = pictures?.length ? pictures : restaurant.pictures;
    restaurant.contact = {
      address: contact?.address || restaurant.contact.address,
      phone: contact?.phone || restaurant.contact.phone,
      email: contact?.email || restaurant.contact.email,
    };
    restaurant.menu = menu?.length ? menu : restaurant.menu;

    const updated = await restaurant.save();
    res.json(updated);
  } catch (err) {
    console.error("Update Restaurant Error:", err);
    res.status(500).json({ message: "Failed to update restaurant" });
  }
};

module.exports = {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantRatingsReviews,
  addRestaurantByOwner,
  getMyRestaurant,
  updateMyRestaurant,
};
