import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { Trash2, MapPin, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SavedLocations = () => {
  const { savedLocations, removeSavedLocation, setLocation } = useContext(WeatherContext);
  const navigate = useNavigate();

  const handleSelect = (loc) => {
    setLocation(loc);
    navigate('/');
  };

  return (
    <div className="animate-fade-in">
      <div className="title-section">
        <h1>Saved Locations</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Quickly access weather for your favorite cities.</p>
      </div>

      {savedLocations.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)' }}>
          <MapPin size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
          <h3>No saved locations yet</h3>
          <p>Search for a city on the Home page and click the Heart icon to save it.</p>
        </div>
      ) : (
        <div className="location-grid">
          {savedLocations.map((loc, index) => (
            <div
              key={`${loc.name}-${loc.country}`}
              className="glass-panel"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                animationDelay: `${index * 0.1}s`,
                animationName: 'fadeIn',
                animationDuration: '0.5s',
                animationFillMode: 'both'
              }}
            >
              <div
                style={{ flex: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}
                onClick={() => handleSelect(loc)}
              >
                <div style={{ background: 'var(--accent)', color: 'white', padding: '1rem', borderRadius: '50%' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{loc.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{loc.country}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn-icon"
                  title="View Weather"
                  onClick={() => handleSelect(loc)}
                  style={{ color: 'var(--accent)' }}
                >
                  <ExternalLink size={20} />
                </button>
                <button
                  className="btn-icon"
                  title="Remove"
                  onClick={() => removeSavedLocation(loc.name, loc.country)}
                  style={{ color: 'var(--danger)' }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedLocations;
