
import React, { useState } from 'react';
import { useWeather } from '../hooks/useWeather';
import WeatherHero from '../components/WeatherHero';
import MainWeatherCard from '../components/MainWeatherCard';
import WeatherDetailCards from '../components/WeatherDetailCards';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { weatherData, loading, error, fetchWeather, searchLocation } = useWeather();
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
      const locations = await searchLocation(searchQuery);
      if (locations.length > 0) {
        await fetchWeather(locations[0].lat, locations[0].lon);
        toast({
          title: "Weather Updated",
          description: `Showing weather for ${locations[0].name}`,
        });
      } else {
        toast({
          title: "Location Not Found",
          description: "Please try a different location",
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

  if (loading && !weatherData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error && !weatherData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="text-lg mb-4">{error}</p>
          <p className="text-sm">Using demo data for preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <WeatherHero weatherData={weatherData} />
      
      {/* Main Content */}
      <div className="px-4 pb-8">
        {/* Main Weather Card */}
        <MainWeatherCard 
          weatherData={weatherData}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
        />
        
        {/* Weather Detail Cards */}
        <WeatherDetailCards weatherData={weatherData} />
      </div>
    </div>
  );
};

export default Index;
