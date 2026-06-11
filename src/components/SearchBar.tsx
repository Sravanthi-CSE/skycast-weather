import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationRequest: () => void;
  loading: boolean;
  recentCities: string[];
  onRecentCityClick: (city: string) => void;
}

export default function SearchBar({
  onSearch,
  onLocationRequest,
  loading,
  recentCities,
  onRecentCityClick,
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [showRecent, setShowRecent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowRecent(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowRecent(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => recentCities.length > 0 && setShowRecent(true)}
              placeholder="Search for a city..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-slate-700/50 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-400/50 dark:focus:ring-sky-500/50 transition-all shadow-lg shadow-black/5 dark:shadow-black/20"
            />
          </div>
          <motion.button
            type="submit"
            disabled={loading || !query.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-medium shadow-lg shadow-sky-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </motion.button>
          <motion.button
            type="button"
            onClick={onLocationRequest}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl border border-white/30 dark:border-slate-700/50 text-slate-600 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 disabled:opacity-50 transition-colors shadow-lg shadow-black/5 dark:shadow-black/20"
            title="Use my location"
          >
            <MapPin className="w-5 h-5" />
          </motion.button>
        </div>
      </form>

      <AnimatePresence>
        {showRecent && recentCities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/30 dark:border-slate-700/50 shadow-xl z-50"
          >
            <p className="px-3 py-1.5 text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Recent Searches
            </p>
            {recentCities.map((city) => (
              <button
                key={city}
                onClick={() => {
                  setQuery(city);
                  onRecentCityClick(city);
                  setShowRecent(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors"
              >
                {city}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
