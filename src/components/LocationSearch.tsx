
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Location {
  id: number;
  name: string;
  region: string;
  country: string;
}

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
  onSearch: (query: string) => Promise<Location[]>;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect, onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const handleInputChange = async (value: string) => {
    setQuery(value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (value.length >= 2) {
      timeoutRef.current = setTimeout(async () => {
        setLoading(true);
        try {
          const results = await onSearch(value);
          setSuggestions(results.slice(0, 5));
          setIsOpen(true);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setLoading(false);
        }
      }, 300);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleLocationSelect = (location: Location) => {
    const locationString = `${location.name}, ${location.country}`;
    setQuery(locationString);
    setIsOpen(false);
    setSuggestions([]);
    onLocationSelect(locationString);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onLocationSelect(query.trim());
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => setIsOpen(false);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            className="pl-10 pr-20 h-12 bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:bg-white/30 focus:border-white/50 transition-all duration-300"
          />
          <Button 
            type="submit"
            size="sm"
            className="absolute right-1 top-1 h-10 px-4 bg-blue-500 hover:bg-blue-600 text-white border-0"
          >
            Search
          </Button>
        </div>
      </form>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/30 z-50 max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-600">Searching...</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((location) => (
              <button
                key={location.id}
                onClick={() => handleLocationSelect(location)}
                className="w-full text-left p-3 hover:bg-blue-50 transition-colors duration-200 border-b border-gray-100 last:border-0"
              >
                <div className="font-medium text-gray-800">{location.name}</div>
                <div className="text-sm text-gray-600">
                  {location.region}, {location.country}
                </div>
              </button>
            ))
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-600">No locations found</div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
