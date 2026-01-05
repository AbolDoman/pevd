import type { Station } from '../types/station';

interface StationListProps {
  stations: Station[];
  selectedStation: Station | null;
  onStationClick: (station: Station) => void;
}

export function StationList({ stations, selectedStation, onStationClick }: StationListProps) {
  if (stations.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No stations found
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-full">
      <ul className="divide-y divide-gray-200">
        {stations.map((station) => (
          <li
            key={station.id}
            onClick={() => onStationClick(station)}
            className={`p-4 cursor-pointer transition-colors duration-200 hover:bg-blue-50 ${
              selectedStation?.id === station.id
                ? 'bg-blue-100 border-l-4 border-blue-500'
                : ''
            }`}
          >
            <h3 className="font-semibold text-gray-900">{station.name}</h3>
            <p className="text-sm text-gray-600">{station.city}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
