import React, { useContext, useEffect, useState } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { fetchWeather } from '../utils/api';
import { getWeatherIcon, getWeatherDescription } from '../utils/weatherCodes';
import { Clock, Droplets, Wind } from 'lucide-react';

const Hourly = () => {
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
    return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading hourly forecast...</div>;
  }

  // Get next 24 hours
  const currentHourIndex = data.hourly.time.findIndex(t => new Date(t) >= new Date());
  const hourlyData = [];
  for (let i = currentHourIndex; i < currentHourIndex + 24; i++) {
    if (data.hourly.time[i]) {
      hourlyData.push({
        time: new Date(data.hourly.time[i]),
        temp: data.hourly.temperature_2m[i],
        code: data.hourly.weather_code[i],
        wind: data.hourly.wind_speed_10m[i],
        humidity: data.hourly.relative_humidity_2m[i],
      });
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="title-section">
        <h1>24-Hour Forecast</h1>
        <p style={{ color: 'var(--text-secondary)' }}>{location.name}, {location.country}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1rem', overflowX: 'auto', paddingBottom: '2rem' }}>
        {hourlyData.map((hour, index) => (
          <div 
            key={index} 
            className="glass-panel" 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              animationDelay: `${index * 0.05}s`,
              animationName: 'fadeIn',
              animationDuration: '0.5s',
              animationFillMode: 'both'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '120px' }}>
              <Clock style={{ color: 'var(--accent)' }} size={20} />
              <strong style={{ fontSize: '1.2rem' }}>
                {hour.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </strong>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, justifyContent: 'center' }}>
              <div style={{ color: 'var(--accent)' }}>
                {getWeatherIcon(hour.code, 32)}
              </div>
              <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', display: 'none' }} className="d-md-block">
                {getWeatherDescription(hour.code)}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', justifyContent: 'flex-end', minWidth: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} title="Humidity">
                <Droplets size={16} color="var(--text-secondary)" />
                <span>{hour.humidity}%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} title="Wind Speed">
                <Wind size={16} color="var(--text-secondary)" />
                <span>{hour.wind} km/h</span>
              </div>
              <strong style={{ fontSize: '1.5rem', width: '60px', textAlign: 'right' }}>
                {Math.round(hour.temp)}°{units === 'celsius' ? 'C' : 'F'}
              </strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hourly;
