import axios from 'axios';

const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export const fetchLocations = async (query) => {
  try {
    const response = await axios.get(`${GEO_API_URL}?name=${query}&count=5&language=en&format=json`);
    return response.data.results || [];
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};

export const fetchWeather = async (lat, lon, isFahrenheit = false) => {
  try {
    const tempUnit = isFahrenheit ? 'fahrenheit' : 'celsius';
    const response = await axios.get(
      `${WEATHER_API_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&temperature_unit=${tempUnit}&timezone=auto`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};
