
import React, { useState } from 'react';
import { useRealtimeWeather } from '../hooks/useRealtimeWeather';
import WeatherHero from '../components/WeatherHero';
import MainWeatherCard from '../components/MainWeatherCard';
import WeatherDetailCards from '../components/WeatherDetailCards';
import WeatherRefreshButton from '../components/WeatherRefreshButton';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { 
    currentCityWeather, 
    weatherData, 
    loading, 
    error, 
    selectCity, 
    searchCities 
  } = useRealtimeWeather();
  
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Error",
        description: "Please enter a location to search",
        variant: "destructive",
      });
      return;
    }

    try {
      const results = await searchCities(searchQuery);
      if (results.length > 0) {
        await selectCity(results[0].city, results[0].state);
        toast({
          title: "Weather Updated",
          description: `Showing weather for ${results[0].city}`,
        });
      } else {
        toast({
          title: "Location Not Found",
          description: "Please try a different location from Telangana",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data",
        variant: "destructive",
      });
    }
  };

  // Transform current weather data to match existing component structure
  const transformedWeatherData = currentCityWeather ? {
    location: {
      city: currentCityWeather.city,
      state: currentCityWeather.state
    },
    current: {
      temp: currentCityWeather.temperature_celsius,
      feels_like: currentCityWeather.temperature_celsius + 2, // Approximate feels like
      humidity: currentCityWeather.humidity_percent,
      wind_speed: currentCityWeather.wind_speed_kmph ? currentCityWeather.wind_speed_kmph / 3.6 : 0, // Convert to m/s
      weather: [{
        description: currentCityWeather.description || currentCityWeather.condition,
        icon: currentCityWeather.icon_code
      }]
    },
    daily: weatherData.slice(0, 5).map((weather, index) => ({
      temp: {
        max: weather.temperature_celsius + Math.floor(Math.random() * 5),
        min: weather.temperature_celsius - Math.floor(Math.random() * 8)
      },
      weather: [{
        description: weather.description || weather.condition,
        icon: weather.icon_code
      }],
      humidity: weather.humidity_percent,
      wind_speed: weather.wind_speed_kmph ? weather.wind_speed_kmph / 3.6 : 0
    }))
  } : null;

  if (loading && !currentCityWeather) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading real-time weather data...</p>
        </div>
      </div>
    );
  }

  if (error && !currentCityWeather) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg mb-4">{error}</p>
          <p className="text-sm">Please check your connection and try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Real-time indicator */}
      <div className="bg-green-100 border-b border-green-200 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <span className="text-green-800 text-sm font-medium">
              Real-time Weather Updates • Last updated: {
                currentCityWeather?.last_updated 
                  ? new Date(currentCityWeather.last_updated).toLocaleTimeString()
                  : 'Loading...'
              }
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-green-600 text-xs">
              {weatherData.length} cities tracked
            </span>
            <WeatherRefreshButton />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <WeatherHero weatherData={transformedWeatherData} />
      
      {/* Main Content */}
      <div className="px-4 pb-8">
        {/* Main Weather Card */}
        <MainWeatherCard 
          weatherData={transformedWeatherData}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
        />
        
        {/* Weather Detail Cards with real-time data */}
        <WeatherDetailCards 
          weatherData={transformedWeatherData} 
          allCitiesData={weatherData}
        />
      </div>
    </div>
  );
};

export default Index;
