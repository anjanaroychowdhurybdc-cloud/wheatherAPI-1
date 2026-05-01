import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CloudSun, Home, Clock, Calendar, MapPin, Settings } from 'lucide-react';
import { WeatherContext } from '../context/WeatherContext';

const Navbar = () => {
  const { pathname } = useLocation();
  const { theme } = useContext(WeatherContext);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'Hourly', path: '/hourly', icon: <Clock size={20} /> },
    { name: 'Daily', path: '/daily', icon: <Calendar size={20} /> },
    { name: 'Locations', path: '/locations', icon: <MapPin size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <CloudSun size={32} />
        <span>WeatherX</span>
      </Link>
      
      <div className="nav-links">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            to={item.path} 
            className={`nav-link ${pathname === item.path ? 'active' : ''}`}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
