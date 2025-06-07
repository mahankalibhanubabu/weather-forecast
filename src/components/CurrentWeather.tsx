
import React from 'react';
import { Cloud } from 'lucide-react';

interface CurrentWeatherProps {
  data: any;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  if (!data) return null;

  const { location, current } = data;

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (timeString: string) => {
    return new Date(timeString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="text-center text-white space-y-6">
      {/* Location and Date */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold">
          {location.name}
        </h1>
        <p className="text-lg opacity-90">
          {location.region}, {location.country}
        </p>
        <p className="text-sm opacity-75">
          {formatDate(location.localtime)} • {formatTime(location.localtime)}
        </p>
      </div>

      {/* Main Temperature */}
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4">
          {current.condition.icon ? (
            <img 
              src={`https:${current.condition.icon}`}
              alt={current.condition.text}
              className="w-24 h-24 md:w-32 md:h-32"
            />
          ) : (
            <Cloud className="w-24 h-24 md:w-32 md:h-32 text-white/80" />
          )}
          <div className="text-center">
            <div className="text-6xl md:text-8xl font-light">
              {Math.round(current.temp_c)}°
            </div>
            <div className="text-xl md:text-2xl opacity-90">
              {current.condition.text}
            </div>
          </div>
        </div>

        <div className="text-lg opacity-90">
          Feels like {Math.round(current.feelslike_c)}°C
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold">{current.humidity}%</div>
          <div className="text-sm opacity-75">Humidity</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold">{current.wind_kph}km/h</div>
          <div className="text-sm opacity-75">Wind Speed</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold">{current.pressure_mb}mb</div>
          <div className="text-sm opacity-75">Pressure</div>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
          <div className="text-2xl font-semibold">{current.uv}</div>
          <div className="text-sm opacity-75">UV Index</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
