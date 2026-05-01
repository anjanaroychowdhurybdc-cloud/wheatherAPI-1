import React, { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem('weather_location');
    return saved ? JSON.parse(saved) : { lat: 22.5626, lon: 88.363, name: "Kolkata", country: "India" };
  });

  const [units, setUnits] = useState(() => {
    return localStorage.getItem('weather_units') || 'celsius';
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('weather_theme') || 'dark';
  });

  const [savedLocations, setSavedLocations] = useState(() => {
    const saved = localStorage.getItem('weather_saved_locations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('weather_location', JSON.stringify(location));
  }, [location]);

  useEffect(() => {
    localStorage.setItem('weather_units', units);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('weather_theme', theme);
  }, [units, theme]);

  useEffect(() => {
    localStorage.setItem('weather_saved_locations', JSON.stringify(savedLocations));
  }, [savedLocations]);

  const toggleUnits = () => {
    setUnits(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const addSavedLocation = (loc) => {
    setSavedLocations(prev => {
      if (!prev.find(item => item.name === loc.name && item.country === loc.country)) {
        return [...prev, loc];
      }
      return prev;
    });
  };

  const removeSavedLocation = (name, country) => {
    setSavedLocations(prev => prev.filter(loc => !(loc.name === name && loc.country === country)));
  };

  return (
    <WeatherContext.Provider value={{
      location, setLocation,
      units, toggleUnits,
      theme, toggleTheme,
      savedLocations, addSavedLocation, removeSavedLocation
    }}>
      {children}
    </WeatherContext.Provider>
  );
};
