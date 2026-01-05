import { useState, useMemo } from 'react';
import { useStationsQuery } from './hooks/useStationsQuery';
import { StationMap } from './components/StationMap';
import { StationList } from './components/StationList';
import { CityFilter } from './components/CityFilter';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Train, MapIcon } from 'lucide-react';
import type { Station } from './types/station';

function App() {
  const { data: stations = [], isLoading, error } = useStationsQuery();
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  const filteredStations = useMemo(() => {
    if (!selectedCity || selectedCity === 'all') return stations;
    return stations.filter((station) => station.city === selectedCity);
  }, [stations, selectedCity]);

  const handleStationClick = (station: Station) => {
    setSelectedStation(station);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedStation(null);
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="h-screen flex flex-col bg-linear-to-br from-background via-background to-accent/20">
      <header className="border-b bg-card/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-linear-to-br from-primary to-primary/80 rounded-xl shadow-lg shadow-primary/25">
                <Train className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  German Train Stations
                </h1>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Explore <span className="font-medium text-primary">{stations.length}</span> stations across Germany
                </p>
              </div>
            </div>
            <CityFilter
              stations={stations}
              selectedCity={selectedCity}
              onCityChange={handleCityChange}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row gap-4 lg:gap-6">
          <Card className="lg:w-[380px] h-72 lg:h-full flex flex-col shadow-lg border-border/50">
            <CardHeader className="border-b bg-linear-to-r from-muted/80 to-muted/40 py-3.5 px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2.5 text-foreground">
                  <div className="p-1.5 bg-primary/10 rounded-md">
                    <Train className="h-3.5 w-3.5 text-primary" />
                  </div>
                  Station List
                </CardTitle>
                <Badge variant="secondary" className="font-semibold tabular-nums shadow-sm">
                  {filteredStations.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
              <StationList
                stations={filteredStations}
                selectedStation={selectedStation}
                onStationClick={handleStationClick}
              />
            </CardContent>
          </Card>

          <Card className="flex-1 min-h-[400px] flex flex-col shadow-lg border-border/50">
            <CardHeader className="border-b bg-linear-to-r from-muted/80 to-muted/40 py-3.5 px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold flex items-center gap-2.5 text-foreground">
                  <div className="p-1.5 bg-primary/10 rounded-md">
                    <MapIcon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  Interactive Map
                </CardTitle>
                {selectedStation && (
                  <Badge variant="outline" className="font-medium bg-background/50 backdrop-blur-sm">
                    {selectedStation.name}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 overflow-hidden">
              <StationMap
                stations={filteredStations}
                selectedStation={selectedStation}
                onStationClick={handleStationClick}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default App;
