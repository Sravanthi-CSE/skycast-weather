import { motion } from 'framer-motion';
import { Sun, Moon, Thermometer, Settings } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  unit: 'celsius' | 'fahrenheit';
  toggleUnit: () => void;
  onOpenSettings: () => void;
}

export default function Header({ theme, toggleTheme, unit, toggleUnit, onOpenSettings }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-4 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-sky-500/25">
            <Sun className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-white tracking-tight">
              SkyCast
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Real-time Weather Intelligence
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Unit Toggle */}
          <motion.button
            onClick={toggleUnit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/30 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-slate-700/50 transition-colors"
          >
            <Thermometer className="w-4 h-4" />
            <span className="text-sm font-medium">{unit === 'celsius' ? '°C' : '°F'}</span>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/30 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-slate-700/50 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5 text-amber-400" />
            )}
          </motion.button>

          {/* Settings */}
          <motion.button
            onClick={onOpenSettings}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2.5 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/30 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-white/70 dark:hover:bg-slate-700/50 transition-colors"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
