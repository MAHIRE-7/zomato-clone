import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [activeTab, setActiveTab] = useState('add-restaurant');
  const [restaurantForm, setRestaurantForm] = useState({
    name: '',
    cuisine: '',
    address: '',
    rating: '',
    deliveryTime: '',
    image: ''
  });
  const [dishForm, setDishForm] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/restaurants`);
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    }
  };

  const addRestaurant = async (e) => {
    e.preventDefault();
    try {
      const restaurantData = {
        ...restaurantForm,
        rating: parseFloat(restaurantForm.rating) || 4.0,
        menu: []
      };
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/restaurants`, restaurantData);
      alert('Restaurant added successfully!');
      setRestaurantForm({ name: '', cuisine: '', address: '', rating: '', deliveryTime: '', image: '' });
      fetchRestaurants();
    } catch (error) {
      alert('Error adding restaurant: ' + error.response?.data?.error);
    }
  };

  const addDish = async (e) => {
    e.preventDefault();
    if (!selectedRestaurant) {
      alert('Please select a restaurant first');
      return;
    }

    try {
      const restaurant = restaurants.find(r => r._id === selectedRestaurant);
      const updatedMenu = [...(restaurant.menu || []), {
        ...dishForm,
        price: parseFloat(dishForm.price)
      }];

      await axios.put(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/restaurants/${selectedRestaurant}`, {
        ...restaurant,
        menu: updatedMenu
      });

      alert('Dish added successfully!');
      setDishForm({ name: '', price: '', description: '', category: '', image: '' });
      fetchRestaurants();
    } catch (error) {
      alert('Error adding dish: ' + error.response?.data?.error);
    }
  };

  const deleteRestaurant = async (id) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/restaurants/${id}`);
        alert('Restaurant deleted successfully!');
        fetchRestaurants();
      } catch (error) {
        alert('Error deleting restaurant: ' + error.response?.data?.error);
      }
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Admin Panel</h1>
      
      {/* Tab Navigation */}
      <div style={{ marginBottom: '2rem', borderBottom: '2px solid #eee' }}>
        <button 
          onClick={() => setActiveTab('add-restaurant')}
          style={{
            padding: '1rem 2rem',
            border: 'none',
            background: activeTab === 'add-restaurant' ? '#e23744' : 'transparent',
            color: activeTab === 'add-restaurant' ? 'white' : '#333',
            cursor: 'pointer',
            borderRadius: '8px 8px 0 0'
          }}
        >
          Add Restaurant
        </button>
        <button 
          onClick={() => setActiveTab('add-dish')}
          style={{
            padding: '1rem 2rem',
            border: 'none',
            background: activeTab === 'add-dish' ? '#e23744' : 'transparent',
            color: activeTab === 'add-dish' ? 'white' : '#333',
            cursor: 'pointer',
            borderRadius: '8px 8px 0 0'
          }}
        >
          Add Dish
        </button>
        <button 
          onClick={() => setActiveTab('manage-restaurants')}
          style={{
            padding: '1rem 2rem',
            border: 'none',
            background: activeTab === 'manage-restaurants' ? '#e23744' : 'transparent',
            color: activeTab === 'manage-restaurants' ? 'white' : '#333',
            cursor: 'pointer',
            borderRadius: '8px 8px 0 0'
          }}
        >
          Manage Restaurants
        </button>
      </div>

      {/* Add Restaurant Tab */}
      {activeTab === 'add-restaurant' && (
        <div className="form-container">
          <h2>Add New Restaurant</h2>
          <form onSubmit={addRestaurant}>
            <div className="form-group">
              <label>Restaurant Name</label>
              <input
                type="text"
                value={restaurantForm.name}
                onChange={(e) => setRestaurantForm({...restaurantForm, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Cuisine Type</label>
              <input
                type="text"
                value={restaurantForm.cuisine}
                onChange={(e) => setRestaurantForm({...restaurantForm, cuisine: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={restaurantForm.address}
                onChange={(e) => setRestaurantForm({...restaurantForm, address: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Rating (1-5)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={restaurantForm.rating}
                onChange={(e) => setRestaurantForm({...restaurantForm, rating: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Delivery Time</label>
              <input
                type="text"
                placeholder="e.g., 30-45 mins"
                value={restaurantForm.deliveryTime}
                onChange={(e) => setRestaurantForm({...restaurantForm, deliveryTime: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Restaurant Image URL</label>
              <input
                type="url"
                placeholder="https://example.com/restaurant-image.jpg"
                value={restaurantForm.image}
                onChange={(e) => setRestaurantForm({...restaurantForm, image: e.target.value})}
              />
            </div>
            <button type="submit" className="btn-primary">Add Restaurant</button>
          </form>
        </div>
      )}

      {/* Add Dish Tab */}
      {activeTab === 'add-dish' && (
        <div className="form-container">
          <h2>Add Dish to Restaurant</h2>
          <div className="form-group">
            <label>Select Restaurant</label>
            <select
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', border: '2px solid #e0e0e0', borderRadius: '6px' }}
            >
              <option value="">Choose a restaurant...</option>
              {restaurants.map(restaurant => (
                <option key={restaurant._id} value={restaurant._id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>

          <form onSubmit={addDish}>
            <div className="form-group">
              <label>Dish Name</label>
              <input
                type="text"
                value={dishForm.name}
                onChange={(e) => setDishForm({...dishForm, name: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Price (₹)</label>
              <input
                type="number"
                step="0.01"
                value={dishForm.price}
                onChange={(e) => setDishForm({...dishForm, price: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={dishForm.description}
                onChange={(e) => setDishForm({...dishForm, description: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                placeholder="e.g., Main Course, Appetizer, Dessert"
                value={dishForm.category}
                onChange={(e) => setDishForm({...dishForm, category: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Dish Image URL</label>
              <input
                type="url"
                placeholder="https://example.com/dish-image.jpg"
                value={dishForm.image}
                onChange={(e) => setDishForm({...dishForm, image: e.target.value})}
              />
            </div>
            <button type="submit" className="btn-primary">Add Dish</button>
          </form>
        </div>
      )}

      {/* Manage Restaurants Tab */}
      {activeTab === 'manage-restaurants' && (
        <div>
          <h2>Manage Restaurants ({restaurants.length})</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {restaurants.map(restaurant => (
              <div key={restaurant._id} style={{ 
                background: 'white', 
                padding: '1.5rem', 
                borderRadius: '12px',
                border: '1px solid #eee',
                display: 'flex',
                gap: '1rem'
              }}>
                {restaurant.image && (
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <h3>{restaurant.name}</h3>
                  <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
                  <p><strong>Address:</strong> {restaurant.address}</p>
                  <p><strong>Rating:</strong> ⭐ {restaurant.rating}</p>
                  <p><strong>Delivery:</strong> {restaurant.deliveryTime}</p>
                  <p><strong>Menu Items:</strong> {restaurant.menu?.length || 0}</p>
                  
                  {restaurant.menu && restaurant.menu.length > 0 && (
                    <div style={{ marginTop: '1rem' }}>
                      <h4>Menu:</h4>
                      <div style={{ display: 'grid', gap: '0.5rem' }}>
                        {restaurant.menu.map((dish, index) => (
                          <div key={index} style={{ 
                            background: '#f8f9fa', 
                            padding: '0.5rem', 
                            borderRadius: '4px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <div>
                              <strong>{dish.name}</strong> - {dish.description}
                              <br />
                              <small>{dish.category}</small>
                            </div>
                            <span style={{ color: '#e23744', fontWeight: 'bold' }}>₹{dish.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <button 
                    onClick={() => deleteRestaurant(restaurant._id)}
                    style={{
                      background: '#dc3545',
                      color: 'white',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;