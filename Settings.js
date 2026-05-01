import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

const Settings = () => {
  const { units, toggleUnits, theme, toggleTheme } = useContext(WeatherContext);

  return (
    <div className="animate-fade-in glass-panel" style={{ maxWidth: '600px', margin: '0 auto', marginTop: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Settings</h1>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
        <div>
          <h3>Theme</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Switch between Light and Dark mode</p>
        </div>
        <button className="btn btn-primary" onClick={toggleTheme}>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3>Temperature Units</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Switch between Celsius and Fahrenheit</p>
        </div>
        <button className="btn btn-primary" onClick={toggleUnits}>
          {units === 'celsius' ? 'Switch to °F' : 'Switch to °C'}
        </button>
      </div>
    </div>
  );
};

export default Settings;
