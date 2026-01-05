import { useMemo } from 'react';
import type { Station } from '../types/station';

interface CityFilterProps {
  stations: Station[];
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export function CityFilter({ stations, selectedCity, onCityChange }: CityFilterProps) {
  const cities = useMemo(() => {
    const uniqueCities = [...new Set(stations.map((s) => s.city))];
    return uniqueCities.sort();
  }, [stations]);

  return (
    <div className="flex gap-2 items-center">
      <label htmlFor="city-filter" className="font-medium text-gray-700">
        Filter by City:
      </label>
      <select
        id="city-filter"
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
      >
        <option value="">All Cities</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      {selectedCity && (
        <button
          onClick={() => onCityChange('')}
          className="px-3 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  );
}
