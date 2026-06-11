import {
  Sun,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
  CloudDrizzle,
  Moon,
  CloudMoon,
  CloudSun,
  type LucideIcon,
} from 'lucide-react';

// Map OpenWeatherMap icon codes to Lucide icons
export const getWeatherIcon = (iconCode: string): LucideIcon => {
  // iconCode format: "01d", "02n", etc.
  const code = iconCode.substring(0, 2);
  const isDay = iconCode.endsWith('d');

  switch (code) {
    case '01': // clear sky
      return isDay ? Sun : Moon;
    case '02': // few clouds
      return isDay ? CloudSun : CloudMoon;
    case '03': // scattered clouds
    case '04': // broken clouds
      return Cloud;
    case '09': // shower rain
      return CloudDrizzle;
    case '10': // rain
      return CloudRain;
    case '11': // thunderstorm
      return CloudLightning;
    case '13': // snow
      return CloudSnow;
    case '50': // mist/fog
      return CloudFog;
    default:
      return isDay ? Sun : Moon;
  }
};

// Get weather condition description
export const getWeatherDescription = (condition: string): string => {
  const descriptions: Record<string, string> = {
    'Clear': 'Clear Sky',
    'Clouds': 'Cloudy',
    'Rain': 'Rainy',
    'Drizzle': 'Light Rain',
    'Thunderstorm': 'Thunderstorm',
    'Snow': 'Snowy',
    'Mist': 'Misty',
    'Fog': 'Foggy',
    'Haze': 'Hazy',
    'Smoke': 'Smoky',
    'Dust': 'Dusty',
    'Sand': 'Sandy',
    'Tornado': 'Tornado',
    'Squall': 'Squally',
  };
  return descriptions[condition] || condition;
};

// Get gradient based on weather condition and time
export const getWeatherGradient = (condition: string, isDay: boolean): string => {
  if (!isDay) {
    return 'from-slate-900 via-indigo-950 to-slate-900';
  }

  switch (condition) {
    case 'Clear':
      return 'from-sky-400 via-blue-500 to-indigo-500';
    case 'Clouds':
      return 'from-slate-400 via-slate-500 to-gray-600';
    case 'Rain':
    case 'Drizzle':
      return 'from-slate-600 via-slate-700 to-gray-800';
    case 'Thunderstorm':
      return 'from-slate-800 via-purple-900 to-slate-900';
    case 'Snow':
      return 'from-slate-300 via-slate-400 to-gray-500';
    case 'Mist':
    case 'Fog':
    case 'Haze':
      return 'from-gray-400 via-gray-500 to-slate-600';
    default:
      return 'from-sky-400 via-blue-500 to-indigo-500';
  }
};

// Get background animation class based on weather
export const getWeatherAnimation = (condition: string): string => {
  switch (condition) {
    case 'Rain':
    case 'Drizzle':
      return 'rain-animation';
    case 'Snow':
      return 'snow-animation';
    case 'Clouds':
      return 'cloud-animation';
    case 'Clear':
      return 'sun-animation';
    default:
      return '';
  }
};

// Convert Kelvin to Celsius
export const kelvinToCelsius = (kelvin: number): number => {
  return Math.round((kelvin - 273.15) * 10) / 10;
};

// Convert Kelvin to Fahrenheit
export const kelvinToFahrenheit = (kelvin: number): number => {
  return Math.round(((kelvin - 273.15) * 9 / 5 + 32) * 10) / 10;
};

// Convert temperature based on unit
export const convertTemp = (kelvin: number, unit: 'celsius' | 'fahrenheit'): number => {
  return unit === 'celsius' ? kelvinToCelsius(kelvin) : kelvinToFahrenheit(kelvin);
};

// Format temperature with unit
export const formatTemp = (temp: number, unit: 'celsius' | 'fahrenheit'): string => {
  const symbol = unit === 'celsius' ? '°C' : '°F';
  return `${Math.round(temp)}${symbol}`;
};

// Format date
export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Format time
export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format day name
export const formatDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

// Format full day name
export const formatFullDayName = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};
