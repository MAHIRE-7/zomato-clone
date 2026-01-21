import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

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

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/restaurants/search/${searchQuery}`);
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error searching restaurants:', error);
      }
    } else {
      fetchRestaurants();
    }
  };

  return (
    <div>
      <section className="hero">
        <h1>Discover great places to eat</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for restaurants, cuisines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </section>

      <div className="restaurants-grid">
        {restaurants.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
            <p>No restaurants found. Add some restaurants to get started!</p>
          </div>
        ) : (
          restaurants.map((restaurant) => {
            const rating = restaurant.rating || 4.2;
            const ratingClass = rating >= 4.0 ? '' : rating >= 3.0 ? 'medium' : 'low';
            
            return (
              <div
                key={restaurant._id}
                className="restaurant-card"
                onClick={() => navigate(`/restaurant/${restaurant._id}`)}
              >
                <div className="restaurant-image">
                  {restaurant.deliveryTime && (
                    <div className="delivery-time">{restaurant.deliveryTime}</div>
                  )}
                  {restaurant.name}
                </div>
                <div className="restaurant-info">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <p className="restaurant-cuisine">{restaurant.cuisine}</p>
                  <div className="restaurant-meta">
                    <span className={`restaurant-rating ${ratingClass}`}>
                      ★ {rating}
                    </span>
                    <span className="price-range">₹₹</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;