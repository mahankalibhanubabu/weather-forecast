
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type WeatherData = Database['public']['Tables']['weather_data']['Row'];

export class SupabaseWeatherService {
  
  // Get all weather data
  async getAllWeatherData(): Promise<WeatherData[]> {
    const { data, error } = await supabase
      .from('weather_data')
      .select('*')
      .order('last_updated', { ascending: false });
    
    if (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
    
    return data || [];
  }

  // Get weather for a specific city
  async getWeatherByCity(city: string, state: string = 'Telangana'): Promise<WeatherData | null> {
    const { data, error } = await supabase
      .from('weather_data')
      .select('*')
      .eq('city', city)
      .eq('state', state)
      .single();
    
    if (error) {
      console.error('Error fetching weather for city:', error);
      return null;
    }
    
    return data;
  }

  // Subscribe to real-time weather updates
  subscribeToWeatherUpdates(callback: (weatherData: WeatherData[]) => void) {
    const channel = supabase
      .channel('weather-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'weather_data'
        },
        async () => {
          // Fetch fresh data when any change occurs
          try {
            const weatherData = await this.getAllWeatherData();
            callback(weatherData);
          } catch (error) {
            console.error('Error fetching updated weather data:', error);
          }
        }
      )
      .subscribe();

    return channel;
  }

  // Search cities by name
  async searchCities(query: string): Promise<WeatherData[]> {
    const { data, error } = await supabase
      .from('weather_data')
      .select('*')
      .ilike('city', `%${query}%`)
      .order('city');
    
    if (error) {
      console.error('Error searching cities:', error);
      return [];
    }
    
    return data || [];
  }
}

export const supabaseWeatherService = new SupabaseWeatherService();
