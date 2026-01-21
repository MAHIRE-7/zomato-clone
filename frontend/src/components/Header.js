import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Zomato</Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/profile">Hi, {user.name}</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/admin">Admin</Link>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;