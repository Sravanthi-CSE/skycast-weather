import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Cloud } from 'lucide-react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import ErrorMessage from './components/ErrorMessage';
import Footer from './components/Footer';
import ApiKeyModal from './components/ApiKeyModal';
import { useWeather, useTemperature } from './hooks/useWeather';
import { useTheme } from './hooks/useTheme';
import { useLocalStorage } from './hooks/useLocalStorage';

export default function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { unit, toggleUnit, getTemp, unitSymbol } = useTemperature();
  const { current, forecast, loading, error, fetchWeather, fetchWeatherByCoords, isMock, apiKey } = useWeather();
  const [recentCities, setRecentCities] = useLocalStorage<string[]>('weather-recent-cities', []);
  const [dismissedError, setDismissedError] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const handleSearch = useCallback(
    (city: string) => {
      setDismissedError(false);
      fetchWeather(city);
      setRecentCities((prev) => {
        const filtered = prev.filter((c) => c.toLowerCase() !== city.toLowerCase());
        return [city, ...filtered].slice(0, 8);
      });
    },
    [fetchWeather, setRecentCities]
  );

  const handleLocationRequest = useCallback(() => {
    setDismissedError(false);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        () => {
          fetchWeather('London');
        }
      );
    } else {
      fetchWeather('London');
    }
  }, [fetchWeatherByCoords, fetchWeather]);

  const handleSaveApiKey = useCallback((key: string) => {
    localStorage.setItem('skycast-api-key', key);
    // Refresh the page to pick up the new key
    window.location.reload();
  }, []);

  // Load default city on mount
  useEffect(() => {
    if (!current && !loading) {
      fetchWeather('London');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const weatherCondition = current?.weather[0].main || 'Clear';
  const isDay = current ? current.weather[0].icon.endsWith('d') : true;

  // Dynamic background gradient based on weather
  const getBackgroundGradient = () => {
    if (isDark) {
      return 'from-slate-900 via-slate-800 to-slate-900';
    }
    switch (weatherCondition) {
      case 'Clear':
        return isDay ? 'from-sky-300 via-blue-400 to-indigo-400' : 'from-slate-800 via-indigo-900 to-slate-900';
      case 'Clouds':
        return 'from-slate-300 via-slate-400 to-gray-500';
      case 'Rain':
      case 'Drizzle':
        return 'from-slate-500 via-slate-600 to-gray-700';
      case 'Thunderstorm':
        return 'from-slate-700 via-purple-800 to-slate-900';
      case 'Snow':
        return 'from-slate-200 via-slate-300 to-gray-400';
      default:
        return 'from-sky-300 via-blue-400 to-indigo-400';
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-colors duration-700`}
    >
      {/* Animated background overlay */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          unit={unit}
          toggleUnit={toggleUnit}
          onOpenSettings={() => setShowApiKeyModal(true)}
        />

        <main className="flex-1 px-4 sm:px-6 py-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Search Bar */}
            <SearchBar
              onSearch={handleSearch}
              onLocationRequest={handleLocationRequest}
              loading={loading}
              recentCities={recentCities}
              onRecentCityClick={handleSearch}
            />

            {/* Mock Mode Notice */}
            {isMock && (
              <div className="w-full max-w-xl mx-auto">
                <div className="px-4 py-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur-xl border border-amber-200/50 dark:border-amber-800/30">
                  <p className="text-xs text-amber-700 dark:text-amber-300 text-center">
                    Demo Mode: Using mock data. Click the{' '}
                    <span className="font-semibold">settings icon</span> in the header to add your OpenWeatherMap API key for live data.
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            <AnimatePresence>
              {error && !dismissedError && (
                <ErrorMessage
                  message={error}
                  onDismiss={() => setDismissedError(true)}
                />
              )}
            </AnimatePresence>

            {/* Loading State */}
            {loading && !current && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <Cloud className="w-16 h-16 text-white/60 animate-bounce" />
                  <div className="absolute inset-0 w-16 h-16 bg-white/20 rounded-full blur-xl animate-pulse" />
                </div>
                <p className="mt-4 text-white/70 text-lg font-medium">Fetching weather data...</p>
                <div className="mt-3 w-48 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-white/60 rounded-full animate-[loading_1.5s_ease-in-out_infinite]" />
                </div>
              </div>
            )}

            {/* Weather Content */}
            {current && (
              <div className="space-y-6">
                <CurrentWeather
                  data={current}
                  getTemp={getTemp}
                  unitSymbol={unitSymbol}
                />

                {forecast && forecast.length > 0 && (
                  <Forecast
                    days={forecast}
                    getTemp={getTemp}
                    unitSymbol={unitSymbol}
                  />
                )}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => setShowApiKeyModal(false)}
        onSave={handleSaveApiKey}
        currentKey={apiKey}
      />
    </div>
  );
}
