
import { useState, useEffect } from 'react';
import { getWeatherData, searchLocations } from '../services/weatherApi';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherData(location);
      setWeatherData(data);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchLocation = async (query: string) => {
    try {
      return await searchLocations(query);
    } catch (err) {
      console.error('Location search error:', err);
      return [];
    }
  };

  // Load default weather data for London on component mount
  useEffect(() => {
    fetchWeather('London');
  }, []);

  return {
    weatherData,
    loading,
    error,
    fetchWeather,
    searchLocation
  };
};
