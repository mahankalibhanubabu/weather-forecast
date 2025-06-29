
import { useState, useEffect } from 'react';
import { supabaseWeatherService } from '@/services/supabaseWeatherService';
import type { Database } from '@/integrations/supabase/types';

type WeatherData = Database['public']['Tables']['weather_data']['Row'];

export const useRealtimeWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [currentCityWeather, setCurrentCityWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load initial weather data
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await supabaseWeatherService.getAllWeatherData();
        setWeatherData(data);
        
        // Set Hyderabad as default city
        const hyderabadWeather = data.find(w => w.city === 'Hyderabad');
        if (hyderabadWeather) {
          setCurrentCityWeather(hyderabadWeather);
        }
        
        console.log('Initial weather data loaded:', data);
      } catch (err) {
        setError('Failed to load weather data');
        console.error('Weather data loading error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Set up real-time subscription
  useEffect(() => {
    const handleRealtimeUpdate = (updatedData: WeatherData[]) => {
      console.log('Real-time weather update received:', updatedData);
      setWeatherData(updatedData);
      
      // Update current city weather if it's in the updated data
      if (currentCityWeather) {
        const updatedCurrentWeather = updatedData.find(
          w => w.city === currentCityWeather.city && w.state === currentCityWeather.state
        );
        if (updatedCurrentWeather) {
          setCurrentCityWeather(updatedCurrentWeather);
        }
      }
    };

    const channel = supabaseWeatherService.subscribeToWeatherUpdates(handleRealtimeUpdate);

    return () => {
      channel.unsubscribe();
    };
  }, [currentCityWeather]);

  const selectCity = async (cityName: string, stateName: string = 'Telangana') => {
    setLoading(true);
    setError(null);
    
    try {
      const cityWeather = await supabaseWeatherService.getWeatherByCity(cityName, stateName);
      if (cityWeather) {
        setCurrentCityWeather(cityWeather);
        console.log('City weather selected:', cityWeather);
      } else {
        setError(`Weather data not found for ${cityName}`);
      }
    } catch (err) {
      setError('Failed to fetch city weather');
      console.error('City weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchCities = async (query: string): Promise<WeatherData[]> => {
    try {
      return await supabaseWeatherService.searchCities(query);
    } catch (err) {
      console.error('City search error:', err);
      return [];
    }
  };

  return {
    weatherData,
    currentCityWeather,
    loading,
    error,
    selectCity,
    searchCities
  };
};
