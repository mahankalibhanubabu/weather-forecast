
import React from 'react';
import { Cloud, Sun } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type WeatherData = Database['public']['Tables']['weather_data']['Row'];

interface WeatherDetailCardsProps {
  weatherData: any;
  allCitiesData?: WeatherData[];
}

const WeatherDetailCards: React.FC<WeatherDetailCardsProps> = ({ weatherData, allCitiesData = [] }) => {
  if (!weatherData?.daily && !allCitiesData.length) return null;

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode?.includes('01') || iconCode?.includes('02')) {
      return <Sun className="w-8 h-8 text-yellow-400" />;
    }
    return <Cloud className="w-8 h-8 text-blue-300" />;
  };

  const getDayName = (index: number) => {
    const days = ['Tomorrow', 'Day After Tomorrow'];
    return days[index] || `Day ${index + 1}`;
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {/* Current Location Extended Forecast */}
      {weatherData?.daily && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            7-Day Forecast for {weatherData.location?.city || 'Current Location'}
          </h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {weatherData.daily.slice(1, 5).map((day: any, index: number) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <div className="text-center">
                  <h4 className="font-medium text-gray-800 mb-2">
                    {getDayName(index)}
                  </h4>
                  
                  <div className="mb-3">
                    {day.weather?.[0]?.icon ? (
                      <img
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt={day.weather[0].description}
                        className="w-12 h-12 mx-auto"
                      />
                    ) : (
                      <div className="flex justify-center">
                        {getWeatherIcon('01d')}
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-lg font-semibold text-gray-800">
                      {Math.round(day.temp?.max || 0)}°
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      / {Math.round(day.temp?.min || 0)}°
                    </span>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-2">
                    {day.weather?.[0]?.description || 'Clear conditions'}
                  </p>
                  
                  <div className="text-xs text-gray-500">
                    <div>💧 {day.humidity || 0}%</div>
                    <div>💨 {Math.round((day.wind_speed || 0) * 3.6)} km/h</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Real-time Telangana Cities Weather */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Live Weather in {weatherData?.location?.state || 'Telangana'}
          </h3>
          <div className="flex items-center text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            Real-time Updates
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCitiesData.map((cityWeather) => (
            <div key={`${cityWeather.city}-${cityWeather.state}`} 
                 className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">{cityWeather.city}</h4>
                <span className="text-2xl font-light text-gray-800">
                  {cityWeather.temperature_celsius}°C
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{cityWeather.condition}</p>
              
              {cityWeather.description && (
                <p className="text-xs text-gray-500 mb-2">{cityWeather.description}</p>
              )}
              
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                <div>💧 {cityWeather.humidity_percent || 0}%</div>
                <div>💨 {cityWeather.wind_speed_kmph || 0} km/h</div>
                <div className="col-span-2 text-right text-xs text-gray-400">
                  Updated: {new Date(cityWeather.last_updated).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Tips for Indian Climate */}
      <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Weather Tips for {weatherData?.location?.state || 'Telangana'}
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <h4 className="font-medium mb-1">Summer Season (March-June)</h4>
            <p>Temperatures can reach 40°C+. Stay hydrated and avoid direct sunlight during peak hours (11 AM - 4 PM).</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Monsoon Season (July-September)</h4>
            <p>Heavy rainfall expected. Carry umbrella and avoid waterlogged areas. Humidity levels increase significantly.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetailCards;
