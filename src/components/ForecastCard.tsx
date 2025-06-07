
import React from 'react';
import { Cloud } from 'lucide-react';

interface ForecastDay {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    daily_chance_of_rain: number;
  };
}

interface ForecastCardProps {
  day: ForecastDay;
  isToday?: boolean;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ day, isToday = false }) => {
  const dayName = isToday 
    ? 'Today' 
    : new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' });

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
      <div className="font-medium text-sm mb-3 opacity-90">
        {dayName}
      </div>
      
      <div className="flex justify-center mb-3">
        {day.day.condition.icon ? (
          <img 
            src={`https:${day.day.condition.icon}`}
            alt={day.day.condition.text}
            className="w-12 h-12"
          />
        ) : (
          <Cloud className="w-12 h-12 text-white/70" />
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="font-semibold">{Math.round(day.day.maxtemp_c)}°</span>
          <span className="opacity-70">{Math.round(day.day.mintemp_c)}°</span>
        </div>
        
        <div className="text-xs opacity-75">
          {Math.round(day.day.daily_chance_of_rain)}% rain
        </div>
      </div>
    </div>
  );
};

export default ForecastCard;
