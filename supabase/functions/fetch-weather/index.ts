
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Telangana cities with their coordinates
const TELANGANA_CITIES = [
  { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
  { name: 'Warangal', lat: 17.9689, lon: 79.5941 },
  { name: 'Karimnagar', lat: 18.4382, lon: 79.1288 },
  { name: 'Khammam', lat: 17.2500, lon: 80.1500 },
  { name: 'Nizamabad', lat: 18.6700, lon: 78.1000 },
  { name: 'Siddipet', lat: 18.1018, lon: 78.8492 },
  { name: 'Mahabubnagar', lat: 16.7460, lon: 78.0026 },
  { name: 'Adilabad', lat: 19.6670, lon: 78.5300 },
  { name: 'Nalgonda', lat: 17.0500, lon: 79.2667 },
  { name: 'Mancherial', lat: 18.8700, lon: 79.4500 }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openWeatherApiKey = Deno.env.get('OPENWEATHER_API_KEY');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!openWeatherApiKey) {
      throw new Error('OpenWeather API key not found');
    }

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      throw new Error('Supabase configuration not found');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

    console.log('Starting weather data fetch for', TELANGANA_CITIES.length, 'cities');

    const weatherUpdates = [];

    // Fetch weather data for each city
    for (const city of TELANGANA_CITIES) {
      try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${openWeatherApiKey}&units=metric`;
        
        const response = await fetch(weatherUrl);
        const weatherData = await response.json();

        if (response.ok) {
          const weatherRecord = {
            city: city.name,
            state: 'Telangana',
            latitude: city.lat,
            longitude: city.lon,
            temperature_celsius: Math.round(weatherData.main.temp),
            condition: weatherData.weather[0].main,
            description: weatherData.weather[0].description,
            humidity_percent: weatherData.main.humidity,
            wind_speed_kmph: weatherData.wind?.speed ? Math.round(weatherData.wind.speed * 3.6) : null,
            wind_direction: weatherData.wind?.deg ? getWindDirection(weatherData.wind.deg) : null,
            icon_code: weatherData.weather[0].icon
          };

          weatherUpdates.push(weatherRecord);
          console.log(`Fetched weather for ${city.name}:`, weatherRecord.temperature_celsius, '°C');
        } else {
          console.error(`Failed to fetch weather for ${city.name}:`, weatherData.message);
        }
      } catch (cityError) {
        console.error(`Error fetching weather for ${city.name}:`, cityError);
      }
    }

    // Update database with new weather data
    if (weatherUpdates.length > 0) {
      const { data, error } = await supabase
        .from('weather_data')
        .upsert(weatherUpdates, { 
          onConflict: 'city,state',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Database update error:', error);
        throw error;
      }

      console.log(`Successfully updated weather data for ${weatherUpdates.length} cities`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        updated_cities: weatherUpdates.length,
        cities: weatherUpdates.map(w => w.city)
      }), 
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Weather fetch error:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});

// Helper function to convert wind degree to direction
function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}
