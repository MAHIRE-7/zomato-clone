const axios = require('axios');

const sampleRestaurants = [
  {
    name: "Pizza Palace",
    cuisine: "Italian",
    address: "123 Main St, Downtown",
    rating: 4.5,
    deliveryTime: "30-45 mins",
    menu: [
      { name: "Margherita Pizza", price: 299, description: "Fresh tomatoes, mozzarella, basil", category: "Pizza" },
      { name: "Pepperoni Pizza", price: 399, description: "Pepperoni, mozzarella, tomato sauce", category: "Pizza" },
      { name: "Garlic Bread", price: 149, description: "Crispy bread with garlic butter", category: "Sides" }
    ]
  },
  {
    name: "Burger Junction",
    cuisine: "American",
    address: "456 Oak Avenue, City Center",
    rating: 4.2,
    deliveryTime: "25-35 mins",
    menu: [
      { name: "Classic Burger", price: 249, description: "Beef patty, lettuce, tomato, onion", category: "Burgers" },
      { name: "Cheese Burger", price: 279, description: "Classic burger with cheese", category: "Burgers" },
      { name: "French Fries", price: 99, description: "Crispy golden fries", category: "Sides" }
    ]
  },
  {
    name: "Spice Garden",
    cuisine: "Indian",
    address: "789 Curry Lane, Spice District",
    rating: 4.7,
    deliveryTime: "40-50 mins",
    menu: [
      { name: "Butter Chicken", price: 349, description: "Creamy tomato curry with chicken", category: "Main Course" },
      { name: "Biryani", price: 299, description: "Fragrant rice with spices and meat", category: "Rice" },
      { name: "Naan", price: 49, description: "Soft Indian bread", category: "Bread" }
    ]
  }
];

async function addSampleData() {
  try {
    for (const restaurant of sampleRestaurants) {
      // amazonq-ignore-next-line
      await axios.post('http://localhost:8000/api/restaurants', restaurant);
      console.log(`Added ${restaurant.name}`);
    }
    console.log('Sample data added successfully!');
  } catch (error) {
    console.error('Error adding sample data:', error.message);
  }
}

// Wait for services to start, then add data
setTimeout(addSampleData, 10000);