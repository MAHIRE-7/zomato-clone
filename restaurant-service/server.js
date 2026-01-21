const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3002;

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL);

// Restaurant Schema
const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cuisine: String,
  address: String,
  rating: { type: Number, default: 0 },
  deliveryTime: String,
  image: String,
  menu: [{
    name: String,
    price: Number,
    description: String,
    category: String,
    image: String
  }]
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// Get all restaurants
app.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get restaurant by ID
app.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.json(restaurant);
  } catch (error) {
    res.status(404).json({ error: 'Restaurant not found' });
  }
});

// Add restaurant
app.post('/', async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update restaurant
app.put('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(restaurant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete restaurant
app.delete('/:id', async (req, res) => {
  try {
    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search restaurants
app.get('/search/:query', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      $or: [
        { name: { $regex: req.params.query, $options: 'i' } },
        { cuisine: { $regex: req.params.query, $options: 'i' } }
      ]
    });
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Restaurant Service running on port ${PORT}`);
});