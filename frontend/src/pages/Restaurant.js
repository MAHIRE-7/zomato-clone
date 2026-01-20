import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Restaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchRestaurant();
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/restaurants/${id}`);
      setRestaurant(response.data);
    } catch (error) {
      console.error('Error fetching restaurant:', error);
    }
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(`${item.name} added to cart!`);
  };

  const placeOrder = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Please login to place order');
      return;
    }

    const orderData = {
      userId: user.id,
      restaurantId: id,
      items: cart,
      totalAmount: cart.reduce((sum, item) => sum + item.price, 0),
      deliveryAddress: 'Default Address'
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/orders`, orderData);
      alert('Order placed successfully!');
      setCart([]);
    } catch (error) {
      alert('Order failed: ' + error.response?.data?.error);
    }
  };

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', marginBottom: '2rem' }}>
        <h1 className="restaurant-name">{restaurant.name}</h1>
        <p className="restaurant-cuisine">{restaurant.cuisine}</p>
        <p>{restaurant.address}</p>
        <span className="restaurant-rating">★ {restaurant.rating || 4.2}</span>
      </div>

      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px' }}>
        <h2>Menu</h2>
        {restaurant.menu?.map((item, index) => (
          <div key={index} className="menu-item">
            <div className="item-info">
              <h4>{item.name}</h4>
              <p>{item.description}</p>
            </div>
            <div>
              <span className="item-price">₹{item.price}</span>
              <button className="add-btn" onClick={() => addToCart(item)}>
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', marginTop: '2rem' }}>
          <h3>Cart ({cart.length} items)</h3>
          <p>Total: ₹{cart.reduce((sum, item) => sum + item.price, 0)}</p>
          <button className="btn-primary" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default Restaurant;