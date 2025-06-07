
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

  return (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
      {weatherData.daily.slice(1, 3).map((day: any, index: number) => (
        <div key={index} className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            {day.weather?.[0]?.icon ? (
              <img
                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt={day.weather[0].description}
                className="w-12 h-12 mr-4"
              />
            ) : (
              <div className="mr-4">
                {getWeatherIcon('01d')}
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {formatLocationName(weatherData.location?.name || 'Location')} {index === 0 ? 'Tomorrow' : 'Day After'}
              </h3>
              <p className="text-sm text-gray-600">
                {Math.round(day.temp?.day || 0)}°, {Math.round(day.temp?.max || 0)}°
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">
            {day.weather?.[0]?.description || 'Clear conditions expected for the day ahead'}
          </p>
          
          <div className="text-sm text-gray-500">
            <p>Humidity: {day.humidity || 0}%</p>
            <p className="mt-1">Wind: {Math.round((day.wind_speed || 0) * 3.6)} km/h</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeatherDetailCards;
