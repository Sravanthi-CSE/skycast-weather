import { motion } from 'framer-motion';
import { Droplets, Wind, Gauge, Thermometer, Eye, Sunrise, Sunset, MapPin } from 'lucide-react';
import type { CurrentWeatherResponse } from '../types/weather';
import { getWeatherIcon, getWeatherDescription, formatDate, formatTime } from '../utils/weatherIcons';

interface CurrentWeatherProps {
  data: CurrentWeatherResponse;
  getTemp: (kelvin: number) => number;
  unitSymbol: string;
}

export default function CurrentWeather({ data, getTemp, unitSymbol }: CurrentWeatherProps) {
  const WeatherIcon = getWeatherIcon(data.weather[0].icon);
  const isDay = data.weather[0].icon.endsWith('d');

  const details = [
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${data.main.humidity}%`,
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${data.wind.speed.toFixed(1)} m/s`,
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${data.main.pressure} hPa`,
    },
    {
      icon: Thermometer,
      label: 'Feels Like',
      value: `${Math.round(getTemp(data.main.feels_like))}${unitSymbol}`,
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${(data.visibility / 1000).toFixed(1)} km`,
    },
    {
      icon: isDay ? Sunrise : Sunset,
      label: isDay ? 'Sunrise' : 'Sunset',
      value: formatTime(isDay ? data.sys.sunrise : data.sys.sunset),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      {/* Main Weather Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white/20 dark:bg-slate-800/30 backdrop-blur-xl border border-white/30 dark:border-slate-700/40 shadow-2xl shadow-black/10 dark:shadow-black/30">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-sky-400/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-400/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

        <div className="relative p-6 sm:p-8">
          {/* Location & Date */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-500 dark:text-sky-400" />
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white">
                {data.name}, {data.sys.country}
              </h2>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {formatDate(data.dt)}
            </p>
          </div>

          {/* Main Weather Display */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="flex flex-col items-center"
            >
              <WeatherIcon className="w-24 h-24 sm:w-32 sm:h-32 text-amber-400 dark:text-amber-300 drop-shadow-lg" />
              <p className="mt-2 text-lg font-medium text-slate-600 dark:text-slate-300 capitalize">
                {getWeatherDescription(data.weather[0].main)}
              </p>
            </motion.div>

            <div className="flex-1 text-center sm:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-6xl sm:text-8xl font-bold text-slate-800 dark:text-white tracking-tight">
                  {Math.round(getTemp(data.main.temp))}
                </span>
                <span className="text-3xl sm:text-4xl font-light text-slate-500 dark:text-slate-400">
                  {unitSymbol}
                </span>
              </motion.div>
              <p className="mt-2 text-slate-500 dark:text-slate-400">
                H: {Math.round(getTemp(data.main.temp_max))}{unitSymbol} &nbsp; L: {Math.round(getTemp(data.main.temp_min))}{unitSymbol}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
        {details.map((detail, index) => (
          <motion.div
            key={detail.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.08 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="group p-4 rounded-2xl bg-white/20 dark:bg-slate-800/30 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 hover:border-sky-300/50 dark:hover:border-sky-500/30 transition-all shadow-lg shadow-black/5 dark:shadow-black/20"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-100/50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 group-hover:bg-sky-100 dark:group-hover:bg-sky-900/50 transition-colors">
                <detail.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{detail.label}</p>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{detail.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
