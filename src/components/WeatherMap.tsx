
import React from 'react';

interface WeatherMapProps {
  location: {
    lat: number;
    lon: number;
    name: string;
  };
}

const WeatherMap: React.FC<WeatherMapProps> = ({ location }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
      <h3 className="text-lg font-semibold mb-4 opacity-90">Weather Map</h3>
      
      <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
        {/* Simulated map background */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-green-400 via-blue-500 to-purple-600"></div>
        </div>
        
        {/* Weather overlay effects */}
        <div className="absolute top-4 left-4 w-16 h-16 bg-yellow-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-8 right-8 w-12 h-12 bg-white rounded-full opacity-40"></div>
        <div className="absolute bottom-6 left-8 w-20 h-20 bg-blue-300 rounded-full opacity-50"></div>
        
        {/* Location marker */}
        <div className="relative z-10 text-center">
          <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2 animate-bounce"></div>
          <div className="text-sm font-medium">{location.name}</div>
          <div className="text-xs opacity-75">
            {location.lat.toFixed(2)}°, {location.lon.toFixed(2)}°
          </div>
        </div>
        
        {/* Animated weather elements */}
        <div className="absolute top-12 left-12 w-2 h-2 bg-white rounded-full animate-ping"></div>
        <div className="absolute bottom-12 right-12 w-3 h-3 bg-blue-200 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="mt-4 text-center text-sm opacity-75">
        Interactive weather visualization for {location.name}
      </div>
    </div>
  );
};

export default WeatherMap;
