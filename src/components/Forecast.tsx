import { motion } from 'framer-motion';
import { CloudRain } from 'lucide-react';
import type { ProcessedForecastDay } from '../types/weather';
import { getWeatherIcon } from '../utils/weatherIcons';

interface ForecastProps {
  days: ProcessedForecastDay[];
  getTemp: (kelvin: number) => number;
  unitSymbol: string;
}

export default function Forecast({ days, getTemp, unitSymbol }: ForecastProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
        <CloudRain className="w-5 h-5 text-sky-500 dark:text-sky-400" />
        5-Day Forecast
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {days.map((day, index) => {
          const WeatherIcon = getWeatherIcon(day.icon);
          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              className="group p-4 rounded-2xl bg-white/20 dark:bg-slate-800/30 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 hover:border-sky-300/50 dark:hover:border-sky-500/30 transition-all shadow-lg shadow-black/5 dark:shadow-black/20 cursor-pointer"
            >
              <div className="flex flex-col items-center text-center gap-2">
                <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                  {index === 0 ? 'Today' : day.dayName}
                </p>
                <WeatherIcon className="w-10 h-10 text-amber-400 dark:text-amber-300 drop-shadow-md group-hover:scale-110 transition-transform" />
                <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">
                  {day.description}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-slate-800 dark:text-white">
                    {Math.round(getTemp(day.temp))}{unitSymbol}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                  <span>L: {Math.round(getTemp(day.minTemp))}{unitSymbol}</span>
                  <span className="w-px h-3 bg-slate-300 dark:bg-slate-600" />
                  <span>H: {Math.round(getTemp(day.maxTemp))}{unitSymbol}</span>
                </div>
                {day.pop > 0.1 && (
                  <div className="flex items-center gap-1 text-xs text-sky-500 dark:text-sky-400">
                    <CloudRain className="w-3 h-3" />
                    <span>{Math.round(day.pop * 100)}%</span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
