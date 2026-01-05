import { useState, useMemo } from 'react';
import { useStations } from './hooks/useStations';
import { StationMap } from './components/StationMap';
import { StationList } from './components/StationList';
import { CityFilter } from './components/CityFilter';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import type { Station } from './types/station';

function App() {
  const { stations, loading, error } = useStations();
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const filteredStations = useMemo(() => {
    if (!selectedCity) return stations;
    return stations.filter((station) => station.city === selectedCity);
  }, [stations, selectedCity]);

  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedStation(null);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">
            German Train Stations
          </h1>
          <CityFilter
            stations={stations}
            selectedCity={selectedCity}
            onCityChange={handleCityChange}
          />
        </div>
      </header>

      <main className="flex-1 p-4 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row gap-4">
          <div className="lg:w-1/3 h-64 lg:h-full bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="font-semibold text-gray-700">
                Stations ({filteredStations.length})
              </h2>
            </div>
            <div className="h-[calc(100%-57px)]">
              <StationList
                stations={filteredStations}
                selectedStation={selectedStation}
                onStationClick={handleStationClick}
              />
            </div>
          </div>

          <div className="lg:w-2/3 flex-1 min-h-[400px] bg-white rounded-lg shadow-sm overflow-hidden">
            <StationMap
              stations={filteredStations}
              selectedStation={selectedStation}
              onStationClick={handleStationClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
