
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const WeatherRefreshButton: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('fetch-weather');
      
      if (error) {
        throw error;
      }

      toast({
        title: "Weather Updated",
        description: `Successfully updated weather data for ${data.updated_cities} cities`,
      });
      
    } catch (err) {
      console.error('Weather refresh error:', err);
      toast({
        title: "Update Failed",
        description: "Failed to refresh weather data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={isRefreshing}
      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
      {isRefreshing ? 'Updating...' : 'Refresh Weather'}
    </button>
  );
};

export default WeatherRefreshButton;
