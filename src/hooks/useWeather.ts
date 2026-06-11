import { useState, useCallback, useRef } from 'react';
import type { CurrentWeatherResponse, ForecastResponse, ProcessedForecastDay, TemperatureUnit } from '../types/weather';
import { getMockCurrentWeather, getMockForecast, processForecastData } from '../utils/mockData';
import { convertTemp } from '../utils/weatherIcons';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface WeatherState {
  current: CurrentWeatherResponse | null;
  forecast: ProcessedForecastDay[] | null;
  loading: boolean;
  error: string | null;
}

function getApiKey(): string {
  try {
    return localStorage.getItem('skycast-api-key') || '';
  } catch {
    return '';
  }
}

function isValidKey(key: string): boolean {
  return key.length > 10 && key !== 'your_api_key_here';
}

export function useWeather() {
  const [state, setState] = useState<WeatherState>({
    current: null,
    forecast: null,
    loading: false,
    error: null,
  });

  const apiKeyRef = useRef(getApiKey());

  const refreshApiKey = useCallback(() => {
    apiKeyRef.current = getApiKey();
  }, []);

  const fetchWeather = useCallback(async (city: string) => {
    refreshApiKey();
    const API_KEY = apiKeyRef.current;
    const USE_MOCK = !isValidKey(API_KEY);

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const current = getMockCurrentWeather(city);
        const forecastRaw = getMockForecast(city);
        const forecast = processForecastData(forecastRaw);
        setState({ current, forecast, loading: false, error: null });
        return;
      }

      const currentRes = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      if (!currentRes.ok) {
        const errorData = await currentRes.json().catch(() => ({}));
        if (currentRes.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key in settings.');
        }
        if (currentRes.status === 404) {
          throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
        }
        if (currentRes.status === 429) {
          throw new Error('API rate limit exceeded. Please wait a moment and try again.');
        }
        throw new Error(errorData.message || `Error ${currentRes.status}: Failed to fetch weather data`);
      }

      const current: CurrentWeatherResponse = await currentRes.json();

      const forecastRes = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );

      if (!forecastRes.ok) {
        throw new Error('Failed to fetch forecast data');
      }

      const forecastRaw: ForecastResponse = await forecastRes.json();
      const forecast = processForecastData(forecastRaw);

      setState({ current, forecast, loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setState((prev) => ({ ...prev, loading: false, error: message }));
    }
  }, [refreshApiKey]);

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    refreshApiKey();
    const API_KEY = apiKeyRef.current;
    const USE_MOCK = !isValidKey(API_KEY);

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 800));
        const cities = ['london', 'new york', 'tokyo', 'paris', 'sydney'];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const current = getMockCurrentWeather(city);
        const forecastRaw = getMockForecast(city);
        const forecast = processForecastData(forecastRaw);
        setState({ current, forecast, loading: false, error: null });
        return;
      }

      const currentRes = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!currentRes.ok) {
        const errorData = await currentRes.json().catch(() => ({}));
        if (currentRes.status === 401) {
          throw new Error('Invalid API key. Please check your OpenWeatherMap API key in settings.');
        }
        throw new Error(errorData.message || 'Failed to fetch weather for your location');
      }

      const current: CurrentWeatherResponse = await currentRes.json();

      const forecastRes = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!forecastRes.ok) {
        throw new Error('Failed to fetch forecast data');
      }

      const forecastRaw: ForecastResponse = await forecastRes.json();
      const forecast = processForecastData(forecastRaw);

      setState({ current, forecast, loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setState((prev) => ({ ...prev, loading: false, error: message }));
    }
  }, [refreshApiKey]);

  return {
    ...state,
    fetchWeather,
    fetchWeatherByCoords,
    isMock: !isValidKey(apiKeyRef.current),
    apiKey: apiKeyRef.current,
  };
}

export function useTemperature() {
  const [unit, setUnit] = useState<TemperatureUnit>('celsius');

  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  }, []);

  const getTemp = useCallback(
    (kelvin: number) => convertTemp(kelvin, unit),
    [unit]
  );

  return { unit, toggleUnit, getTemp, unitSymbol: unit === 'celsius' ? '°C' : '°F' };
}
