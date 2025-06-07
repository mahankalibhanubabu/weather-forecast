
import { useState, useEffect } from 'react';
import { getWeatherData, searchLocations, LocationResult, getAvailableStates, getCitiesByState } from '../services/weatherApi';

export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getWeatherData(lat, lon);
      setWeatherData(data);
      console.log('Weather data fetched:', data);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchLocation = async (query: string): Promise<LocationResult[]> => {
    try {
      return await searchLocations(query);
    } catch (err) {
      console.error('Location search error:', err);
      return [];
    }
  };

  const getStates = () => {
    return getAvailableStates();
  };

  const getCitiesForState = (state: string) => {
    return getCitiesByState(state);
  };

  // Load default weather data for Hyderabad on component mount
  useEffect(() => {
    fetchWeather(17.3850, 78.4867); // Hyderabad coordinates
  }, []);

  return {
    weatherData,
    loading,
    error,
    fetchWeather,
    searchLocation,
    getStates,
    getCitiesForState
  };
};
