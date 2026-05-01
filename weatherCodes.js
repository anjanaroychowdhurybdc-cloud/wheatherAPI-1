import { Sun, Cloud, CloudRain, CloudLightning, Snowflake, CloudFog, CloudDrizzle, CloudSun } from 'lucide-react';
import React from 'react';

export const getWeatherDescription = (code) => {
  if (code === 0) return "Clear sky";
  if (code === 1) return "Mainly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 55) return "Drizzle";
  if (code >= 56 && code <= 57) return "Freezing Drizzle";
  if (code >= 61 && code <= 65) return "Rain";
  if (code >= 66 && code <= 67) return "Freezing Rain";
  if (code >= 71 && code <= 77) return "Snow fall";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 85 && code <= 86) return "Snow showers";
  if (code >= 95) return "Thunderstorm";
  return "Unknown";
};

export const getWeatherIcon = (code, size = 24, className = "") => {
  if (code === 0 || code === 1) return <Sun size={size} className={className} />;
  if (code === 2) return <CloudSun size={size} className={className} />;
  if (code === 3) return <Cloud size={size} className={className} />;
  if (code === 45 || code === 48) return <CloudFog size={size} className={className} />;
  if ((code >= 51 && code <= 57) || (code >= 80 && code <= 82)) return <CloudDrizzle size={size} className={className} />;
  if ((code >= 61 && code <= 67)) return <CloudRain size={size} className={className} />;
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return <Snowflake size={size} className={className} />;
  if (code >= 95) return <CloudLightning size={size} className={className} />;
  return <Sun size={size} className={className} />;
};
