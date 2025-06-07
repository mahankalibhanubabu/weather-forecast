
import React from 'react';
import { useWeather } from '../hooks/useWeather';
import LocationSearch from '../components/LocationSearch';
import CurrentWeather from '../components/CurrentWeather';
import ForecastCard from '../components/ForecastCard';
import HourlyForecast from '../components/HourlyForecast';
import WeatherMap from '../components/WeatherMap';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { weatherData, loading, error, fetchWeather, searchLocation } = useWeather();
  const { toast } = useToast();

  const handleLocationSelect = async (location: string) => {
    console.log('Selected location:', location);
    try {
      await fetchWeather(location);
      toast({
        title: "Weather Updated",
        description: `Showing weather for ${location}`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data",
        variant: "destructive",
      });
    }
  };

  const getBackgroundGradient = () => {
    if (!weatherData?.current) {
      return 'from-blue-600 via-purple-600 to-blue-800';
    }

    const condition = weatherData.current.condition.text.toLowerCase();
    const isDay = weatherData.current.is_day === 1;

    if (condition.includes('sunny') && isDay) {
      return 'from-yellow-400 via-orange-500 to-pink-500';
    } else if (condition.includes('rain')) {
      return 'from-gray-600 via-blue-600 to-gray-800';
    } else if (condition.includes('cloud')) {
      return 'from-gray-400 via-blue-500 to-gray-600';
    } else if (!isDay) {
      return 'from-purple-900 via-blue-900 to-black';
    }
    
    return 'from-blue-600 via-purple-600 to-blue-800';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header with Search */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Advanced Weather App
          </h1>
          <LocationSearch 
            onLocationSelect={handleLocationSelect}
            onSearch={searchLocation}
          />
        </div>

        {loading && (
          <div className="text-center text-white text-xl">
            <div className="animate-spin w-8 h-8 border-4 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
            Loading weather data...
          </div>
        )}

        {error && (
          <div className="text-center text-red-300 text-lg mb-8">
            {error}
          </div>
        )}

        {weatherData && !loading && (
          <div className="space-y-8">
            {/* Current Weather */}
            <CurrentWeather data={weatherData} />

            {/* 7-Day Forecast */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white text-center opacity-90">
                7-Day Forecast
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {weatherData.forecast.forecastday.map((day: any, index: number) => (
                  <ForecastCard 
                    key={day.date} 
                    day={day} 
                    isToday={index === 0} 
                  />
                ))}
              </div>
            </div>

            {/* Hourly Forecast and Weather Map */}
            <div className="grid lg:grid-cols-2 gap-8">
              <HourlyForecast hourlyData={weatherData.forecast.forecastday[0].hour} />
              <WeatherMap location={weatherData.location} />
            </div>

            {/* Additional Weather Details */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center">
                <h3 className="text-lg font-semibold mb-2 opacity-90">Visibility</h3>
                <div className="text-3xl font-bold">{weatherData.current.vis_km} km</div>
                <p className="text-sm opacity-75 mt-2">Clear visibility</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center">
                <h3 className="text-lg font-semibold mb-2 opacity-90">Wind Direction</h3>
                <div className="text-3xl font-bold">{weatherData.current.wind_dir}</div>
                <p className="text-sm opacity-75 mt-2">{weatherData.current.wind_degree}°</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center">
                <h3 className="text-lg font-semibold mb-2 opacity-90">Precipitation</h3>
                <div className="text-3xl font-bold">{weatherData.current.precip_mm} mm</div>
                <p className="text-sm opacity-75 mt-2">Last hour</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center">
                <h3 className="text-lg font-semibold mb-2 opacity-90">Cloud Cover</h3>
                <div className="text-3xl font-bold">{weatherData.current.cloud}%</div>
                <p className="text-sm opacity-75 mt-2">Sky coverage</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
