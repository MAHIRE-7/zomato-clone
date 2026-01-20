const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// User Service Routes
app.post('/api/users/register', async (req, res) => {
  try {
    const response = await axios.post('http://user-service:3001/register', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Service unavailable' });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const response = await axios.post('http://user-service:3001/login', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Service unavailable' });
  }
});

app.get('/api/users/profile/:id', async (req, res) => {
  try {
    const response = await axios.get(`http://user-service:3001/profile/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Service unavailable' });
  }
});

// Restaurant Service Routes
app.get('/api/restaurants', async (req, res) => {
  try {
    const response = await axios.get('http://restaurant-service:3002/');
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Service unavailable' });
  }
});

app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const response = await axios.get(`http://restaurant-service:3002/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Service unavailable' });
  }
});

app.post('/api/restaurants', async (req, res) => {
  try {
    const response = await axios.post('http://restaurant-service:3002/', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Service unavailable' });
  }
});

// Order Service Routes
app.post('/api/orders', async (req, res) => {
  try {
    const response = await axios.post('http://order-service:3003/', req.body);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Service unavailable' });
  }
});

app.get('/api/orders/user/:userId', async (req, res) => {
  try {
    const response = await axios.get(`http://order-service:3003/user/${req.params.userId}`);
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Service unavailable' });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'API Gateway is running' });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});