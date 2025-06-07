
import React from 'react';
import { Cloud, Sun } from 'lucide-react';

interface WeatherDetailCardsProps {
  weatherData: any;
}

const WeatherDetailCards: React.FC<WeatherDetailCardsProps> = ({ weatherData }) => {
  if (!weatherData?.daily) return null;

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode?.includes('01') || iconCode?.includes('02')) {
      return <Sun className="w-8 h-8 text-yellow-400" />;
    }
    return <Cloud className="w-8 h-8 text-blue-300" />;
  };

  const formatLocationName = (name: string) => {
    return name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const getDayName = (index: number) => {
    const days = ['Tomorrow', 'Day After Tomorrow'];
    return days[index] || `Day ${index + 1}`;
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {/* Current Location Extended Forecast */}
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

      {/* Telangana State Overview */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Other Cities in {weatherData.location?.state || 'Telangana'}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Mock data for other Telangana cities */}
          {[
            { name: 'Warangal', temp: 30, condition: 'Sunny', humidity: 55 },
            { name: 'Karimnagar', temp: 31, condition: 'Hazy', humidity: 60 },
            { name: 'Nizamabad', temp: 29, condition: 'Cloudy', humidity: 70 },
            { name: 'Khammam', temp: 33, condition: 'Hot', humidity: 50 },
            { name: 'Mahabubnagar', temp: 32, condition: 'Partly Cloudy', humidity: 62 },
            { name: 'Nalgonda', temp: 34, condition: 'Sunny', humidity: 48 }
          ].map((city, index) => (
            <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-800">{city.name}</h4>
                <span className="text-2xl font-light text-gray-800">{city.temp}°</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{city.condition}</p>
              <div className="text-xs text-gray-500">
                <span>Humidity: {city.humidity}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weather Tips for Indian Climate */}
      <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Weather Tips for {weatherData.location?.state || 'Telangana'}
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
