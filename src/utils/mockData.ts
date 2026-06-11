import type { CurrentWeatherResponse, ForecastResponse, ProcessedForecastDay } from '../types/weather';

const now = () => Math.floor(Date.now() / 1000);
const sunrise = () => now() - 21600;
const sunset = () => now() + 21600;

const makeCurrentWeather = (
  name: string,
  country: string,
  lat: number,
  lon: number,
  temp: number,
  feelsLike: number,
  tempMin: number,
  tempMax: number,
  pressure: number,
  humidity: number,
  windSpeed: number,
  windDeg: number,
  visibility: number,
  cloudAll: number,
  weatherId: number,
  weatherMain: string,
  weatherDesc: string,
  weatherIcon: string,
  timezone: number
): CurrentWeatherResponse => ({
  coord: { lon, lat },
  weather: [{ id: weatherId, main: weatherMain, description: weatherDesc, icon: weatherIcon }],
  base: 'stations',
  main: { temp, feels_like: feelsLike, temp_min: tempMin, temp_max: tempMax, pressure, humidity },
  visibility,
  wind: { speed: windSpeed, deg: windDeg },
  clouds: { all: cloudAll },
  dt: now(),
  sys: { country, sunrise: sunrise(), sunset: sunset() },
  timezone,
  id: Math.floor(Math.random() * 10000000),
  name,
  cod: 200,
});

const mockCurrentData: Record<string, CurrentWeatherResponse> = {
  london: makeCurrentWeather('London', 'GB', 51.5085, -0.1257, 288.55, 287.89, 287.04, 289.82, 1023, 72, 4.12, 240, 10000, 75, 803, 'Clouds', 'broken clouds', '04d', 0),
  'new york': makeCurrentWeather('New York', 'US', 40.7143, -74.006, 295.15, 294.82, 293.15, 297.15, 1015, 55, 3.09, 180, 10000, 0, 800, 'Clear', 'clear sky', '01d', -14400),
  tokyo: makeCurrentWeather('Tokyo', 'JP', 35.6895, 139.6917, 292.15, 292.85, 291.15, 293.15, 1008, 85, 5.14, 120, 8000, 90, 501, 'Rain', 'moderate rain', '10d', 32400),
  paris: makeCurrentWeather('Paris', 'FR', 48.8534, 2.3488, 291.15, 290.55, 289.15, 293.15, 1020, 60, 3.5, 210, 10000, 40, 802, 'Clouds', 'scattered clouds', '03d', 3600),
  sydney: makeCurrentWeather('Sydney', 'AU', -33.8679, 151.2073, 301.15, 302.15, 299.15, 303.15, 1012, 45, 4.5, 100, 10000, 5, 800, 'Clear', 'clear sky', '01d', 36000),
  dubai: makeCurrentWeather('Dubai', 'AE', 25.2582, 55.3047, 310.15, 312.15, 308.15, 312.15, 1005, 30, 6.2, 270, 10000, 0, 800, 'Clear', 'clear sky', '01d', 14400),
  mumbai: makeCurrentWeather('Mumbai', 'IN', 19.0144, 72.8479, 299.15, 301.15, 298.15, 300.15, 1007, 88, 3.8, 240, 6000, 85, 501, 'Rain', 'moderate rain', '10d', 19800),
  singapore: makeCurrentWeather('Singapore', 'SG', 1.2897, 103.8501, 303.15, 305.15, 302.15, 304.15, 1009, 78, 2.5, 150, 10000, 45, 802, 'Clouds', 'scattered clouds', '03d', 28800),
  berlin: makeCurrentWeather('Berlin', 'DE', 52.5244, 13.4105, 286.15, 285.15, 284.15, 288.15, 1021, 68, 3.2, 260, 10000, 70, 803, 'Clouds', 'broken clouds', '04d', 3600),
  toronto: makeCurrentWeather('Toronto', 'CA', 43.6426, -79.3871, 283.15, 281.15, 281.15, 285.15, 1018, 58, 4.5, 280, 10000, 20, 801, 'Clouds', 'few clouds', '02d', -14400),
  delhi: makeCurrentWeather('Delhi', 'IN', 28.6139, 77.209, 305.15, 307.15, 303.15, 307.15, 1006, 42, 3.5, 220, 10000, 10, 800, 'Clear', 'clear sky', '01d', 19800),
  bangalore: makeCurrentWeather('Bangalore', 'IN', 12.9716, 77.5946, 296.15, 295.15, 294.15, 298.15, 1014, 65, 2.8, 180, 10000, 30, 801, 'Clouds', 'few clouds', '02d', 19800),
  chennai: makeCurrentWeather('Chennai', 'IN', 13.0827, 80.2707, 302.15, 304.15, 300.15, 304.15, 1008, 75, 4.0, 160, 10000, 50, 802, 'Clouds', 'scattered clouds', '03d', 19800),
  kolkata: makeCurrentWeather('Kolkata', 'IN', 22.5726, 88.3639, 301.15, 303.15, 299.15, 303.15, 1007, 80, 3.2, 200, 9000, 70, 501, 'Rain', 'moderate rain', '10d', 19800),
  hyderabad: makeCurrentWeather('Hyderabad', 'IN', 17.385, 78.4867, 298.15, 299.15, 296.15, 300.15, 1012, 55, 3.0, 190, 10000, 25, 800, 'Clear', 'clear sky', '01d', 19800),
  pune: makeCurrentWeather('Pune', 'IN', 18.5204, 73.8567, 295.15, 294.15, 293.15, 297.15, 1015, 60, 2.5, 210, 10000, 35, 801, 'Clouds', 'few clouds', '02d', 19800),
};

export const getMockCurrentWeather = (city: string): CurrentWeatherResponse => {
  const key = city.toLowerCase().trim();
  return mockCurrentData[key] || generateRandomWeather(city);
};

const generateRandomWeather = (city: string): CurrentWeatherResponse => {
  const conditions = [
    { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
    { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
    { id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' },
    { id: 500, main: 'Rain', description: 'light rain', icon: '10d' },
    { id: 600, main: 'Snow', description: 'light snow', icon: '13d' },
  ];
  const condition = conditions[Math.floor(Math.random() * conditions.length)];
  const baseTemp = 273.15 + Math.random() * 30 - 5;

  return {
    coord: { lon: 0, lat: 0 },
    weather: [condition],
    base: 'stations',
    main: {
      temp: baseTemp,
      feels_like: baseTemp + (Math.random() * 4 - 2),
      temp_min: baseTemp - 3,
      temp_max: baseTemp + 3,
      pressure: 1000 + Math.floor(Math.random() * 30),
      humidity: 40 + Math.floor(Math.random() * 50),
    },
    visibility: 10000,
    wind: { speed: Math.random() * 10, deg: Math.floor(Math.random() * 360) },
    clouds: { all: Math.floor(Math.random() * 100) },
    dt: now(),
    sys: { country: 'XX', sunrise: sunrise(), sunset: sunset() },
    timezone: 0,
    id: Math.floor(Math.random() * 1000000),
    name: city.charAt(0).toUpperCase() + city.slice(1),
    cod: 200,
  };
};

export const getMockForecast = (city: string): ForecastResponse => {
  const current = getMockCurrentWeather(city);
  const list: ForecastResponse['list'] = [];

  for (let i = 0; i < 40; i++) {
    const dt = now() + i * 3 * 3600;
    const conditions = [
      { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
      { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
      { id: 802, main: 'Clouds', description: 'scattered clouds', icon: '03d' },
      { id: 500, main: 'Rain', description: 'light rain', icon: '10d' },
      { id: 600, main: 'Snow', description: 'light snow', icon: '13d' },
    ];
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const baseTemp = current.main.temp + (Math.random() * 6 - 3);
    const date = new Date(dt * 1000);
    const dtTxt = date.toISOString().slice(0, 10) + ' ' + date.toISOString().slice(11, 19);

    list.push({
      dt,
      main: {
        temp: baseTemp,
        feels_like: baseTemp + (Math.random() * 4 - 2),
        temp_min: baseTemp - 2,
        temp_max: baseTemp + 2,
        pressure: current.main.pressure + Math.floor(Math.random() * 10 - 5),
        humidity: Math.max(20, Math.min(100, current.main.humidity + Math.floor(Math.random() * 20 - 10))),
      },
      weather: [condition],
      clouds: { all: Math.floor(Math.random() * 100) },
      wind: { speed: Math.random() * 8, deg: Math.floor(Math.random() * 360) },
      visibility: 10000,
      pop: Math.random() * 0.5,
      dt_txt: dtTxt,
    });
  }

  return {
    cod: '200',
    message: 0,
    cnt: 40,
    list,
    city: {
      id: current.id,
      name: current.name,
      coord: current.coord,
      country: current.sys.country,
      population: 0,
      timezone: current.timezone,
      sunrise: current.sys.sunrise,
      sunset: current.sys.sunset,
    },
  };
};

export const processForecastData = (forecast: ForecastResponse): ProcessedForecastDay[] => {
  const dailyMap = new Map<string, typeof forecast.list>();

  forecast.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyMap.has(date)) {
      dailyMap.set(date, []);
    }
    dailyMap.get(date)!.push(item);
  });

  const days: ProcessedForecastDay[] = [];
  let count = 0;

  dailyMap.forEach((items, dateStr) => {
    if (count >= 5) return;
    count++;

    const temps = items.map((i) => i.main.temp);
    const humidities = items.map((i) => i.main.humidity);
    const windSpeeds = items.map((i) => i.wind.speed);
    const pops = items.map((i) => i.pop);

    const conditionCounts = new Map<string, number>();
    items.forEach((i) => {
      const key = i.weather[0].main;
      conditionCounts.set(key, (conditionCounts.get(key) || 0) + 1);
    });
    let maxCondition = items[0].weather[0];
    let maxCount = 0;
    conditionCounts.forEach((c, key) => {
      if (c > maxCount) {
        maxCount = c;
        const found = items.find((i) => i.weather[0].main === key);
        if (found) maxCondition = found.weather[0];
      }
    });

    days.push({
      date: dateStr,
      dayName: new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' }),
      temp: temps.reduce((a, b) => a + b, 0) / temps.length,
      feelsLike: items[Math.floor(items.length / 2)].main.feels_like,
      minTemp: Math.min(...temps),
      maxTemp: Math.max(...temps),
      humidity: Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length),
      windSpeed: Math.round((windSpeeds.reduce((a, b) => a + b, 0) / windSpeeds.length) * 10) / 10,
      condition: maxCondition.main,
      description: maxCondition.description,
      icon: maxCondition.icon,
      pop: Math.max(...pops),
    });
  });

  return days;
};
