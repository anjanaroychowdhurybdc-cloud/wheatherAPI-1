import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { fetchWeather } from '../utils/api';
import { getWeatherIcon, getWeatherDescription } from '../utils/weatherCodes';
import { Calendar, Sunrise, Sunset } from 'lucide-react';

const Daily = () => {
  const { location, units } = useContext(WeatherContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeather = async () => {
      setLoading(true);
      const res = await fetchWeather(location.lat, location.lon, units === 'fahrenheit');
      setData(res);
      setLoading(false);
    };
    loadWeather();
  }, [location, units]);

  if (loading || !data) {
    return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading 7-day forecast...</div>;
  }

  const dailyData = data.daily.time.map((time, i) => ({
    time: new Date(time),
    code: data.daily.weather_code[i],
    maxTemp: data.daily.temperature_2m_max[i],
    minTemp: data.daily.temperature_2m_min[i],
    sunrise: new Date(data.daily.sunrise[i]),
    sunset: new Date(data.daily.sunset[i]),
  }));

  return (
    <div className="animate-fade-in">
      <div className="title-section">
        <h1>7-Day Forecast</h1>
        <p style={{ color: 'var(--text-secondary)' }}>{location.name}, {location.country}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {dailyData.map((day, index) => (
          <div 
            key={index} 
            className="glass-panel"
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              padding: '2rem',
              animationDelay: `${index * 0.1}s`,
              animationName: 'fadeIn',
              animationDuration: '0.6s',
              animationFillMode: 'both'
            }}
          >
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', borderBottom: '2px solid var(--accent)', paddingBottom: '0.5rem' }}>
              {index === 0 ? 'Today' : day.time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </h3>
            
            <div style={{ color: 'var(--accent)', margin: '1rem 0', transform: 'scale(1.5)' }}>
              {getWeatherIcon(day.code, 48)}
            </div>
            
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              {getWeatherDescription(day.code)}
            </p>

            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>High</div>
                <strong style={{ fontSize: '1.8rem' }}>{Math.round(day.maxTemp)}°</strong>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Low</div>
                <strong style={{ fontSize: '1.8rem' }}>{Math.round(day.minTemp)}°</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'space-around', background: 'var(--glass-border)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <Sunrise size={16} /> 
                {day.sunrise.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <Sunset size={16} /> 
                {day.sunset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Daily;
