import React, { useContext, useEffect, useState, useRef } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { fetchLocations, fetchWeather } from '../utils/api';
import { getWeatherIcon, getWeatherDescription } from '../utils/weatherCodes';
import { Search, MapPin, Wind, Droplets, Thermometer, Heart, CloudRain } from 'lucide-react';

const Home = () => {
  const { location, setLocation, units, addSavedLocation, savedLocations, removeSavedLocation } = useContext(WeatherContext);
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      const res = await fetchWeather(location.lat, location.lon, units === 'fahrenheit');
      setData(res);
      setLoading(false);
    };
    loadWeather();
  }, [location, units]);

  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      const results = await fetchLocations(e.target.value);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectLocation = (loc) => {
    setLocation({ lat: loc.latitude, lon: loc.longitude, name: loc.name, country: loc.country });
    setSearchQuery('');
    setSearchResults([]);
  };

  const isSaved = savedLocations.some(l => l.name === location.name && l.country === location.country);

  const toggleSave = () => {
    if (isSaved) removeSavedLocation(location.name, location.country);
    else addSavedLocation(location);
  };

  return (
    <div className="animate-fade-in">
      {/* Search Section */}
      <div className="search-container" ref={searchRef}>
        <input 
          type="text" 
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for a city..." 
          className="search-input"
        />
        <Search style={{ position: 'absolute', right: '1.5rem', top: '1.2rem', color: 'var(--text-secondary)' }} />
        
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map(result => (
              <div 
                key={result.id} 
                className="search-result-item"
                onClick={() => handleSelectLocation(result)}
              >
                <strong>{result.name}</strong>, {result.admin1 ? result.admin1 + ', ' : ''}{result.country}
              </div>
            ))}
          </div>
        )}
      </div>

      {loading || !data ? (
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading weather data...</div>
      ) : (
        <div className="dashboard-grid">
          {/* Main Weather */}
          <div className="glass-panel current-weather-card">
            <h2 style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin /> {location.name}, {location.country}
              <button 
                className="btn-icon" 
                onClick={toggleSave} 
                style={{ marginLeft: '1rem', color: isSaved ? 'var(--danger)' : 'var(--text-secondary)' }}
              >
                <Heart fill={isSaved ? "currentColor" : "none"} />
              </button>
            </h2>

            <div style={{ margin: '2rem 0', color: 'var(--accent)' }}>
               {getWeatherIcon(data.current.weather_code, 100)}
            </div>

            <div className="current-temp">
              {Math.round(data.current.temperature_2m)}°{units === 'celsius' ? 'C' : 'F'}
            </div>
            
            <p style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
              {getWeatherDescription(data.current.weather_code)}
            </p>

            <div className="weather-stats">
              <div className="stat-item">
                <Wind /> Wind: {data.current.wind_speed_10m} km/h
              </div>
              <div className="stat-item">
                <Droplets /> Humidity: {data.current.relative_humidity_2m}%
              </div>
              <div className="stat-item">
                <Thermometer /> Feels like: {Math.round(data.current.apparent_temperature)}°
              </div>
              <div className="stat-item">
                <CloudRain /> Precip: {data.current.precipitation} mm
              </div>
            </div>
          </div>

          {/* Quick Summary or Info Panel */}
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Today's Highlights</h3>
            
            <div className="weather-stats" style={{ gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              <div className="stat-item" style={{ background: 'var(--glass-border)', padding: '1.5rem', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Sunrise / Sunset</div>
                  <strong style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                     {new Date(data.daily.sunrise[0]).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} / 
                     {new Date(data.daily.sunset[0]).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </strong>
                </div>
              </div>

              <div className="stat-item" style={{ background: 'var(--glass-border)', padding: '1.5rem', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>Max / Min Temperature</div>
                  <strong style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                     {Math.round(data.daily.temperature_2m_max[0])}° / {Math.round(data.daily.temperature_2m_min[0])}°
                  </strong>
                </div>
              </div>
              
              <div className="stat-item" style={{ background: 'var(--glass-border)', padding: '1.5rem', borderRadius: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>UV Index</div>
                  <strong style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                     {data.daily.uv_index_max[0]} Max
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
