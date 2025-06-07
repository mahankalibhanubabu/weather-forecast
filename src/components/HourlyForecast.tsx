
import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface HourlyForecastProps {
  hourlyData: any[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  const next24Hours = hourlyData.slice(0, 24);
  
  const chartData = next24Hours.map(hour => ({
    time: new Date(hour.time).getHours(),
    temp: Math.round(hour.temp_c),
    humidity: hour.humidity,
    windSpeed: hour.wind_kph
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-white/30">
          <p className="text-gray-800 font-medium">{`${label}:00`}</p>
          <p className="text-blue-600">{`Temperature: ${payload[0].value}°C`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
      <h3 className="text-lg font-semibold mb-4 opacity-90">24-Hour Forecast</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'white', fontSize: 12 }}
              tickFormatter={(value) => `${value}:00`}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'white', fontSize: 12 }}
              tickFormatter={(value) => `${value}°`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#60A5FA" 
              strokeWidth={3}
              dot={{ fill: '#60A5FA', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#60A5FA', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="text-2xl font-semibold">{Math.round(next24Hours[0]?.humidity || 0)}%</div>
          <div className="text-xs opacity-75">Current Humidity</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold">{Math.round(next24Hours[0]?.wind_kph || 0)}</div>
          <div className="text-xs opacity-75">Wind (km/h)</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-semibold">{Math.round(next24Hours[0]?.chance_of_rain || 0)}%</div>
          <div className="text-xs opacity-75">Rain Chance</div>
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
