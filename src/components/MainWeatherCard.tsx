
import React, { useState } from 'react';
import { Cloud, Sun } from 'lucide-react';

interface MainWeatherCardProps {
  weatherData: any;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

const MainWeatherCard: React.FC<MainWeatherCardProps> = ({ 
  weatherData, 
  searchQuery, 
  onSearchChange, 
  onSearch 
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  if (!weatherData) return null;

  const getWeatherIcon = (iconCode: string) => {
    if (iconCode?.includes('01') || iconCode?.includes('02')) {
      return <Sun className="w-16 h-16 text-yellow-400" />;
    }
    return <Cloud className="w-16 h-16 text-blue-300" />;
  };

  const telanganaCities = [
    'Hyderabad', 'Warangal', 'Karimnagar', 'Khammam', 'Nizamabad',
    'Siddipet', 'Mahabubnagar', 'Adilabad', 'Nalgonda', 'Mancherial'
  ];

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowSuggestions(false), 200);
  };

  const handleCitySelect = (city: string) => {
    onSearchChange(city);
    setShowSuggestions(false);
    onSearch();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto -mt-16 relative z-20">
      {/* Search Section */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search Telangana Cities (e.g., Hyderabad, Warangal)"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={onSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* City Suggestions */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 max-h-60 overflow-y-auto">
              <div className="p-2 text-xs text-gray-500 border-b">Telangana Cities</div>
              {telanganaCities.map((city) => (
                <button
                  key={city}
                  onClick={() => handleCitySelect(city)}
                  className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors"
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Weather Display */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Weather Info */}
        <div>
          <div className="flex items-center mb-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              {weatherData.location?.city || 'City'}
            </h2>
            {weatherData.location?.state && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                {weatherData.location.state}
              </span>
            )}
          </div>
          
          <div className="flex items-center mb-4">
            <span className="text-6xl font-light text-gray-800 mr-4">
              {Math.round(weatherData.current?.temp || 0)}°C
            </span>
            <div className="text-sm text-gray-600">
              <div>({new Date().getFullYear()})</div>
              <div className="mt-1">Temperature</div>
            </div>
          </div>
          
          <p className="text-gray-600 mb-2">
            {weatherData.current?.weather?.[0]?.description || 'Clear sky'}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Feels like {Math.round(weatherData.current?.feels_like || 0)}°C
          </p>
          
          {/* Additional Weather Details */}
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <span className="text-gray-500">Humidity:</span>
              <span className="ml-2 font-medium">{weatherData.current?.humidity || 0}%</span>
            </div>
            <div>
              <span className="text-gray-500">Wind:</span>
              <span className="ml-2 font-medium">{Math.round((weatherData.current?.wind_speed || 0) * 3.6)} km/h</span>
            </div>
          </div>
        </div>

        {/* Weather Icon & Actions */}
        <div className="text-center">
          <div className="mb-6">
            {weatherData.current?.weather?.[0]?.icon ? (
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@4x.png`}
                alt={weatherData.current.weather[0].description}
                className="w-32 h-32 mx-auto"
              />
            ) : (
              getWeatherIcon('01d')
            )}
          </div>
          
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Current
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              7-Day Forecast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWeatherCard;
