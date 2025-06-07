
// Custom API data for Indian weather
const INDIAN_WEATHER_DATA = {
  "api_version": "1.0",
  "last_updated": "2025-06-07T15:00:00Z",
  "locations": [
    {
      "state": "Telangana",
      "city": "Hyderabad",
      "coordinates": {
        "latitude": 17.3850,
        "longitude": 78.4867
      },
      "weather_data": {
        "date": "2025-06-07",
        "temperature_celsius": 32,
        "temperature_fahrenheit": 89.6,
        "condition": "Partly Cloudy",
        "description": "Scattered clouds with a chance of light showers.",
        "humidity_percent": 65,
        "wind_speed_kmph": 15,
        "wind_direction": "SW",
        "icon_code": "04d"
      }
    },
    {
      "state": "Telangana",
      "city": "Warangal",
      "coordinates": {
        "latitude": 17.9689,
        "longitude": 79.5941
      },
      "weather_data": {
        "date": "2025-06-07",
        "temperature_celsius": 30,
        "temperature_fahrenheit": 86,
        "condition": "Sunny",
        "description": "Clear skies throughout the day.",
        "humidity_percent": 55,
        "wind_speed_kmph": 10,
        "wind_direction": "N",
        "icon_code": "01d"
      }
    },
    {
      "state": "Telangana",
      "city": "Karimnagar",
      "coordinates": {
        "latitude": 18.4382,
        "longitude": 79.1288
      },
      "weather_data": {
        "date": "2025-06-07",
        "temperature_celsius": 31,
        "temperature_fahrenheit": 87.8,
        "condition": "Hazy",
        "description": "Slight haze with reduced visibility.",
        "humidity_percent": 60,
        "wind_speed_kmph": 8,
        "wind_direction": "SE",
        "icon_code": "50d"
      }
    },
    {
      "state": "Telangana",
      "city": "Khammam",
      "coordinates": {
        "latitude": 17.2500,
        "longitude": 80.1500
      },
      "weather_data": {
        "date": "2025-06-07",
        "temperature_celsius": 33,
        "temperature_fahrenheit": 91.4,
        "condition": "Hot",
        "description": "Very hot and dry conditions.",
        "humidity_percent": 50,
        "wind_speed_kmph": 18,
        "wind_direction": "E",
        "icon_code": "01d"
      }
    },
    {
      "state": "Telangana",
      "city": "Nizamabad",
      "coordinates": {
        "latitude": 18.6700,
        "longitude": 78.1000
      },
      "weather_data": {
        "date": "2025-06-07",
        "temperature_celsius": 29,
        "temperature_fahrenheit": 84.2,
        "condition": "Cloudy",
        "description": "Overcast skies with no immediate rain.",
        "humidity_percent": 70,
        "wind_speed_kmph": 12,
        "wind_direction": "NW",
        "icon_code": "04d"
      }
    },
    {
      "state": "Maharashtra",
      "city": "Mumbai",
      "coordinates": {
        "latitude": 19.0760,
        "longitude": 72.8777
      },
      "weather_data": {
        "date": "2025-06-07",
        "temperature_celsius": 28,
        "temperature_fahrenheit": 82.4,
        "condition": "Rainy",
        "description": "Intermittent light rain.",
        "humidity_percent": 80,
        "wind_speed_kmph": 20,
        "wind_direction": "W",
        "icon_code": "10d"
      }
    },
    {
      "state": "Maharashtra",
      "city": "Pune",
      "coordinates": {
        "latitude": 18.5204,
        "longitude": 73.8567
      },
      "weather_data": {
        "date": "2025-06-07",
        "temperature_celsius": 26,
        "temperature_fahrenheit": 78.8,
        "condition": "Partly Cloudy",
        "description": "Partly cloudy with pleasant weather.",
        "humidity_percent": 75,
        "wind_speed_kmph": 15,
        "wind_direction": "NW",
        "icon_code": "04d"
      }
    },
    {
      "state": "Delhi",
      "city": "New Delhi",
      "coordinates": {
        "latitude": 28.7041,
        "longitude": 77.1025
      },
      "weather_data": {
        "date": "2025-06-07",
        "temperature_celsius": 38,
        "temperature_fahrenheit": 100.4,
        "condition": "Clear",
        "description": "Hot and clear skies.",
        "humidity_percent": 30,
        "wind_speed_kmph": 12,
        "wind_direction": "NW",
        "icon_code": "01d"
      }
    },
    {
      "state": "Karnataka",
      "city": "Bengaluru",
      "coordinates": {
        "latitude": 12.9716,
        "longitude": 77.5946
      },
      "weather_data": {
        "date": "2025-06-07",
        "temperature_celsius": 25,
        "temperature_fahrenheit": 77,
        "condition": "Pleasant",
        "description": "Mild and pleasant weather.",
        "humidity_percent": 70,
        "wind_speed_kmph": 18,
        "wind_direction": "W",
        "icon_code": "02d"
      }
    },
    {
      "state": "Tamil Nadu",
      "city": "Chennai",
      "coordinates": {
        "latitude": 13.0827,
        "longitude": 80.2707
      },
      "weather_data": {
        "date": "2025-06-07",
        "temperature_celsius": 36,
        "temperature_fahrenheit": 96.8,
        "condition": "Hot and Humid",
        "description": "Very hot and humid.",
        "humidity_percent": 85,
        "wind_speed_kmph": 10,
        "wind_direction": "SE",
        "icon_code": "01d"
      }
    }
  ]
};

export interface LocationResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export const searchLocations = async (query: string): Promise<LocationResult[]> => {
  // Search through Indian cities and states
  const results = INDIAN_WEATHER_DATA.locations
    .filter(location => 
      location.city.toLowerCase().includes(query.toLowerCase()) ||
      location.state.toLowerCase().includes(query.toLowerCase())
    )
    .map(location => ({
      name: location.city,
      lat: location.coordinates.latitude,
      lon: location.coordinates.longitude,
      country: 'IN',
      state: location.state
    }))
    .slice(0, 5);

  return results;
};

export const getWeatherData = async (lat: number, lon: number): Promise<any> => {
  // Find matching location in our Indian data
  const location = INDIAN_WEATHER_DATA.locations.find(loc => 
    Math.abs(loc.coordinates.latitude - lat) < 0.1 && 
    Math.abs(loc.coordinates.longitude - lon) < 0.1
  );

  if (location) {
    const weather = location.weather_data;
    
    return {
      location: {
        name: `${location.city}, ${location.state}`,
        lat: location.coordinates.latitude,
        lon: location.coordinates.longitude,
        state: location.state,
        city: location.city
      },
      current: {
        dt: Date.now() / 1000,
        temp: weather.temperature_celsius,
        feels_like: weather.temperature_celsius + 2,
        humidity: weather.humidity_percent,
        pressure: 1013,
        wind_speed: weather.wind_speed_kmph / 3.6, // Convert to m/s
        wind_deg: getWindDegrees(weather.wind_direction),
        weather: [{
          id: 801,
          main: weather.condition,
          description: weather.description,
          icon: weather.icon_code
        }]
      },
      daily: generateDailyForecast(weather.temperature_celsius, weather.humidity_percent, weather.condition),
      hourly: generateHourlyForecast(weather.temperature_celsius, weather.humidity_percent)
    };
  }

  // Fallback to default Hyderabad data if location not found
  const defaultLocation = INDIAN_WEATHER_DATA.locations[0];
  const weather = defaultLocation.weather_data;
  
  return {
    location: {
      name: `${defaultLocation.city}, ${defaultLocation.state}`,
      lat: defaultLocation.coordinates.latitude,
      lon: defaultLocation.coordinates.longitude,
      state: defaultLocation.state,
      city: defaultLocation.city
    },
    current: {
      dt: Date.now() / 1000,
      temp: weather.temperature_celsius,
      feels_like: weather.temperature_celsius + 2,
      humidity: weather.humidity_percent,
      pressure: 1013,
      wind_speed: weather.wind_speed_kmph / 3.6,
      wind_deg: getWindDegrees(weather.wind_direction),
      weather: [{
        id: 801,
        main: weather.condition,
        description: weather.description,
        icon: weather.icon_code
      }]
    },
    daily: generateDailyForecast(weather.temperature_celsius, weather.humidity_percent, weather.condition),
    hourly: generateHourlyForecast(weather.temperature_celsius, weather.humidity_percent)
  };
};

const getWindDegrees = (direction: string): number => {
  const directions: { [key: string]: number } = {
    'N': 0, 'NE': 45, 'E': 90, 'SE': 135,
    'S': 180, 'SW': 225, 'W': 270, 'NW': 315
  };
  return directions[direction] || 0;
};

const generateDailyForecast = (baseTemp: number, baseHumidity: number, condition: string) => {
  return Array.from({ length: 8 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const tempVariation = (Math.random() - 0.5) * 6;
    
    return {
      dt: date.getTime() / 1000,
      temp: {
        day: Math.round(baseTemp + tempVariation),
        min: Math.round(baseTemp - 5 + tempVariation),
        max: Math.round(baseTemp + 3 + tempVariation),
        night: Math.round(baseTemp - 3 + tempVariation),
        eve: Math.round(baseTemp + 1 + tempVariation),
        morn: Math.round(baseTemp - 2 + tempVariation)
      },
      humidity: Math.min(100, Math.max(20, baseHumidity + (Math.random() - 0.5) * 20)),
      wind_speed: 2 + Math.random() * 5,
      weather: [{
        id: 801,
        main: condition,
        description: condition.toLowerCase(),
        icon: getIconForCondition(condition)
      }],
      pop: Math.random() * 0.8
    };
  });
};

const generateHourlyForecast = (baseTemp: number, baseHumidity: number) => {
  return Array.from({ length: 48 }, (_, i) => {
    const tempVariation = Math.sin((i * Math.PI) / 12) * 5; // Temperature curve throughout day
    
    return {
      dt: (Date.now() / 1000) + (i * 3600),
      temp: Math.round(baseTemp + tempVariation + (Math.random() - 0.5) * 3),
      humidity: Math.min(100, Math.max(20, baseHumidity + (Math.random() - 0.5) * 15)),
      wind_speed: 2 + Math.random() * 5,
      weather: [{
        id: 801,
        main: 'Clear',
        description: 'clear sky',
        icon: i % 24 < 6 || i % 24 > 18 ? '01n' : '01d'
      }]
    };
  });
};

const getIconForCondition = (condition: string): string => {
  const conditionMap: { [key: string]: string } = {
    'Sunny': '01d',
    'Clear': '01d',
    'Partly Cloudy': '04d',
    'Cloudy': '04d',
    'Rainy': '10d',
    'Hazy': '50d',
    'Hot': '01d',
    'Pleasant': '02d',
    'Humid': '01d'
  };
  return conditionMap[condition] || '01d';
};

// Get all available states for dropdown
export const getAvailableStates = (): string[] => {
  const states = [...new Set(INDIAN_WEATHER_DATA.locations.map(loc => loc.state))];
  return states.sort();
};

// Get cities by state
export const getCitiesByState = (state: string): string[] => {
  const cities = INDIAN_WEATHER_DATA.locations
    .filter(loc => loc.state === state)
    .map(loc => loc.city);
  return cities.sort();
};
