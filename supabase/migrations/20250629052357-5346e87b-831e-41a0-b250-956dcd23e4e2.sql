
-- Create a table to store weather data with real-time updates
CREATE TABLE public.weather_data (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  temperature_celsius INTEGER NOT NULL,
  condition TEXT NOT NULL,
  description TEXT,
  humidity_percent INTEGER,
  wind_speed_kmph INTEGER,
  wind_direction TEXT,
  icon_code TEXT,
  last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(city, state)
);

-- Create a function to update the last_updated timestamp
CREATE OR REPLACE FUNCTION update_weather_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to automatically update the timestamp
CREATE TRIGGER update_weather_data_timestamp
  BEFORE UPDATE ON public.weather_data
  FOR EACH ROW
  EXECUTE FUNCTION update_weather_timestamp();

-- Enable RLS (Row Level Security)
ALTER TABLE public.weather_data ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to read weather data (public data)
CREATE POLICY "Anyone can view weather data" 
  ON public.weather_data 
  FOR SELECT 
  USING (true);

-- Create policy to allow authenticated users to insert weather data
CREATE POLICY "Authenticated users can insert weather data" 
  ON public.weather_data 
  FOR INSERT 
  WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow authenticated users to update weather data
CREATE POLICY "Authenticated users can update weather data" 
  ON public.weather_data 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Enable realtime for the weather_data table
ALTER TABLE public.weather_data REPLICA IDENTITY FULL;

-- Add the table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.weather_data;

-- Insert initial weather data from your API
INSERT INTO public.weather_data (
  city, state, latitude, longitude, temperature_celsius, condition, 
  description, humidity_percent, wind_speed_kmph, wind_direction, icon_code
) VALUES
('Hyderabad', 'Telangana', 17.3850, 78.4867, 32, 'Partly Cloudy', 'Scattered clouds with a chance of light showers.', 65, 15, 'SW', '04d'),
('Warangal', 'Telangana', 17.9689, 79.5941, 30, 'Sunny', 'Clear skies throughout the day.', 55, 10, 'N', '01d'),
('Karimnagar', 'Telangana', 18.4382, 79.1288, 31, 'Hazy', 'Slight haze with reduced visibility.', 60, 8, 'SE', '50d'),
('Khammam', 'Telangana', 17.2500, 80.1500, 33, 'Hot', 'Very hot and dry conditions.', 50, 18, 'E', '01d'),
('Nizamabad', 'Telangana', 18.6700, 78.1000, 29, 'Cloudy', 'Overcast skies with no immediate rain.', 70, 12, 'NW', '04d')
ON CONFLICT (city, state) DO UPDATE SET
  temperature_celsius = EXCLUDED.temperature_celsius,
  condition = EXCLUDED.condition,
  description = EXCLUDED.description,
  humidity_percent = EXCLUDED.humidity_percent,
  wind_speed_kmph = EXCLUDED.wind_speed_kmph,
  wind_direction = EXCLUDED.wind_direction,
  icon_code = EXCLUDED.icon_code,
  last_updated = now();
