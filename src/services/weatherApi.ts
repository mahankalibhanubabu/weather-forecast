
const API_KEY = 'demo_key'; // Users will need to replace this with their actual OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const ONECALL_URL = 'https://api.openweathermap.org/data/3.0/onecall';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export interface LocationResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export const searchLocations = async (query: string): Promise<LocationResult[]> => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search locations');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching locations:', error);
    // Return mock data for demo purposes
    return [
      { name: 'London', lat: 51.5074, lon: -0.1278, country: 'GB', state: 'England' },
      { name: 'New York', lat: 40.7128, lon: -74.0060, country: 'US', state: 'New York' },
      { name: 'Tokyo', lat: 35.6762, lon: 139.6503, country: 'JP' },
      { name: 'Paris', lat: 48.8566, lon: 2.3522, country: 'FR' },
      { name: 'Sydney', lat: -33.8688, lon: 151.2093, country: 'AU', state: 'New South Wales' }
    ].filter(location => 
      location.name.toLowerCase().includes(query.toLowerCase()) ||
      (location.state && location.state.toLowerCase().includes(query.toLowerCase())) ||
      location.country.toLowerCase().includes(query.toLowerCase())
    );
  }
};

export const getWeatherData = async (lat: number, lon: number): Promise<any> => {
  try {
    const response = await fetch(
      `${ONECALL_URL}?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = await response.json();
    
    // Get location name
    const locationResponse = await fetch(
      `${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );
    
    let locationName = 'Unknown Location';
    if (locationResponse.ok) {
      const locationData = await locationResponse.json();
      if (locationData.length > 0) {
        locationName = locationData[0].name;
      }
    }
    
    return {
      ...data,
      location: {
        name: locationName,
        lat,
        lon
      }
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    // Return mock data for demo purposes
    return getMockWeatherData(lat, lon);
  }
};

const getMockWeatherData = (lat: number, lon: number) => ({
  location: {
    name: 'Sample Location',
    lat,
    lon
  },
  current: {
    dt: Date.now() / 1000,
    temp: 22,
    feels_like: 25,
    humidity: 65,
    pressure: 1013,
    uv: 6,
    visibility: 10000,
    wind_speed: 3.5,
    wind_deg: 250,
    weather: [{
      id: 801,
      main: 'Clouds',
      description: 'few clouds',
      icon: '02d'
    }]
  },
  hourly: Array.from({ length: 48 }, (_, i) => ({
    dt: (Date.now() / 1000) + (i * 3600),
    temp: 18 + Math.random() * 8,
    humidity: 50 + Math.random() * 30,
    wind_speed: 2 + Math.random() * 5,
    weather: [{
      id: 801,
      main: 'Clouds',
      description: 'few clouds',
      icon: '02d'
    }]
  })),
  daily: Array.from({ length: 8 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      dt: date.getTime() / 1000,
      temp: {
        day: 22 + Math.random() * 8,
        min: 15 + Math.random() * 5,
        max: 25 + Math.random() * 10,
        night: 18 + Math.random() * 4,
        eve: 20 + Math.random() * 6,
        morn: 16 + Math.random() * 4
      },
      humidity: 60 + Math.random() * 20,
      wind_speed: 3 + Math.random() * 5,
      weather: [{
        id: 801,
        main: 'Clouds',
        description: 'few clouds',
        icon: '02d'
      }],
      pop: Math.random() * 0.8
    };
  })
});
