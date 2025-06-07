
import React from 'react';

interface WeatherHeroProps {
  weatherData: any;
}

const WeatherHero: React.FC<WeatherHeroProps> = ({ weatherData }) => {
  if (!weatherData) return null;

  const currentDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const formatDate = (date: Date) => {
    return `${date.getDate()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  return (
    <div className="relative h-96 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80")'
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-8">
        <div className="max-w-6xl mx-auto w-full">
          <h1 className="text-4xl md:text-5xl font-light text-white mb-2">
            Advanced Weather
          </h1>
          <p className="text-lg text-white/80 mb-12">
            Current {weatherData.location?.name || 'Location'}
          </p>
          
          <div className="grid grid-cols-3 gap-8 max-w-2xl">
            {/* Current Date */}
            <div>
              <h3 className="text-white/70 text-sm font-medium mb-2">Current</h3>
              <div className="text-white text-3xl font-light">
                {formatDate(currentDate)}
              </div>
              <div className="text-white/60 text-sm">Date</div>
            </div>
            
            {/* Temperature */}
            <div>
              <h3 className="text-white/70 text-sm font-medium mb-2">Month</h3>
              <div className="text-white text-3xl font-light">
                {Math.round(weatherData.current?.temp || 0)}°
              </div>
              <div className="text-white/60 text-sm">Temperature</div>
            </div>
            
            {/* Humidity */}
            <div>
              <h3 className="text-white/70 text-sm font-medium mb-2">Year</h3>
              <div className="text-white text-3xl font-light">
                {weatherData.current?.humidity || 0}%
              </div>
              <div className="text-white/60 text-sm">Humidity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherHero;
