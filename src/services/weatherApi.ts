
const API_KEY = 'demo_key'; // Users will need to replace this with their actual API key
const BASE_URL = 'https://api.weatherapi.com/v1';

export const searchLocations = async (query: string): Promise<any[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/search.json?key=${API_KEY}&q=${query}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search locations');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching locations:', error);
    // Return mock data for demo purposes
    return [
      { id: 1, name: 'London', region: 'England', country: 'United Kingdom', lat: 51.52, lon: -0.11 },
      { id: 2, name: 'New York', region: 'New York', country: 'United States', lat: 40.71, lon: -74.01 },
      { id: 3, name: 'Tokyo', region: 'Tokyo', country: 'Japan', lat: 35.69, lon: 139.69 }
    ].filter(location => 
      location.name.toLowerCase().includes(query.toLowerCase()) ||
      location.region.toLowerCase().includes(query.toLowerCase()) ||
      location.country.toLowerCase().includes(query.toLowerCase())
    );
  }
};

export const getWeatherData = async (location: string): Promise<any> => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast.json?key=${API_KEY}&q=${location}&days=7&aqi=yes&alerts=yes`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Return mock data for demo purposes
    return getMockWeatherData();
  }
};

const getMockWeatherData = () => ({
  location: {
    name: 'London',
    region: 'England',
    country: 'United Kingdom',
    lat: 51.52,
    lon: -0.11,
    tz_id: 'Europe/London',
    localtime_epoch: Date.now() / 1000,
    localtime: new Date().toISOString().slice(0, 16).replace('T', ' ')
  },
  current: {
    last_updated_epoch: Date.now() / 1000,
    last_updated: new Date().toISOString().slice(0, 16).replace('T', ' '),
    temp_c: 22,
    temp_f: 72,
    is_day: 1,
    condition: {
      text: 'Partly cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      code: 1003
    },
    wind_mph: 8.1,
    wind_kph: 13.0,
    wind_degree: 250,
    wind_dir: 'WSW',
    pressure_mb: 1013.0,
    pressure_in: 29.92,
    precip_mm: 0.0,
    precip_in: 0.0,
    humidity: 64,
    cloud: 25,
    feelslike_c: 25.2,
    feelslike_f: 77.4,
    vis_km: 10.0,
    vis_miles: 6.0,
    uv: 6.0,
    gust_mph: 10.1,
    gust_kph: 16.2
  },
  forecast: {
    forecastday: Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        date: date.toISOString().split('T')[0],
        date_epoch: date.getTime() / 1000,
        day: {
          maxtemp_c: 25 + Math.random() * 10,
          maxtemp_f: 77 + Math.random() * 18,
          mintemp_c: 15 + Math.random() * 5,
          mintemp_f: 59 + Math.random() * 9,
          avgtemp_c: 20 + Math.random() * 5,
          avgtemp_f: 68 + Math.random() * 9,
          maxwind_mph: 10 + Math.random() * 10,
          maxwind_kph: 16 + Math.random() * 16,
          totalprecip_mm: Math.random() * 5,
          totalprecip_in: Math.random() * 0.2,
          totalsnow_cm: 0,
          avgvis_km: 10,
          avgvis_miles: 6,
          avghumidity: 60 + Math.random() * 20,
          daily_will_it_rain: Math.random() > 0.7 ? 1 : 0,
          daily_chance_of_rain: Math.random() * 100,
          daily_will_it_snow: 0,
          daily_chance_of_snow: 0,
          condition: {
            text: ['Sunny', 'Partly cloudy', 'Cloudy', 'Overcast'][Math.floor(Math.random() * 4)],
            icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
            code: 1003
          },
          uv: 5 + Math.random() * 5
        },
        astro: {
          sunrise: '06:30 AM',
          sunset: '07:45 PM',
          moonrise: '10:15 PM',
          moonset: '05:30 AM',
          moon_phase: 'Waxing Crescent',
          moon_illumination: '25'
        },
        hour: Array.from({ length: 24 }, (_, h) => ({
          time_epoch: date.getTime() / 1000 + h * 3600,
          time: `${date.toISOString().split('T')[0]} ${h.toString().padStart(2, '0')}:00`,
          temp_c: 18 + Math.random() * 8,
          temp_f: 64 + Math.random() * 14,
          is_day: h >= 6 && h <= 19 ? 1 : 0,
          condition: {
            text: 'Partly cloudy',
            icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
            code: 1003
          },
          wind_mph: 5 + Math.random() * 10,
          wind_kph: 8 + Math.random() * 16,
          wind_degree: 180 + Math.random() * 180,
          wind_dir: 'SW',
          pressure_mb: 1010 + Math.random() * 10,
          pressure_in: 29.8 + Math.random() * 0.3,
          precip_mm: Math.random() * 2,
          precip_in: Math.random() * 0.08,
          humidity: 50 + Math.random() * 30,
          cloud: Math.random() * 80,
          feelslike_c: 18 + Math.random() * 8,
          feelslike_f: 64 + Math.random() * 14,
          windchill_c: 16 + Math.random() * 6,
          windchill_f: 61 + Math.random() * 11,
          heatindex_c: 20 + Math.random() * 6,
          heatindex_f: 68 + Math.random() * 11,
          dewpoint_c: 12 + Math.random() * 6,
          dewpoint_f: 54 + Math.random() * 11,
          will_it_rain: Math.random() > 0.8 ? 1 : 0,
          chance_of_rain: Math.random() * 40,
          will_it_snow: 0,
          chance_of_snow: 0,
          vis_km: 8 + Math.random() * 4,
          vis_miles: 5 + Math.random() * 2.5,
          gust_mph: 8 + Math.random() * 12,
          gust_kph: 13 + Math.random() * 19,
          uv: h >= 10 && h <= 16 ? 3 + Math.random() * 7 : 0
        }))
      };
    })
  }
});
