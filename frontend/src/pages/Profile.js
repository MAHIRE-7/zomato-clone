import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      fetchProfile(userData.id);
      fetchOrders(userData.id);
    }
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/users/profile/${userId}`);
      setUser(response.data);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchOrders = async (userId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/orders/user/${userId}`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div className="form-container">
        <h2>My Profile</h2>
        <div style={{ marginBottom: '2rem' }}>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone || 'Not provided'}</p>
          <p><strong>Address:</strong> {user.address || 'Not provided'}</p>
          <button className="btn-primary" onClick={handleLogout} style={{ marginTop: '1rem' }}>
            Logout
          </button>
        </div>
      </div>

      <div className="form-container">
        <h3>My Orders ({orders.length})</h3>
        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} style={{ 
              border: '1px solid #eee', 
              padding: '1rem', 
              marginBottom: '1rem',
              borderRadius: '8px'
            }}>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p><strong>Status:</strong> <span style={{ 
                color: order.status === 'pending' ? '#e23744' : '#48c479',
                fontWeight: 'bold'
              }}>{order.status}</span></p>
              <p><strong>Items:</strong> {order.items.map(item => item.name).join(', ')}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Profile;