import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Train, MapPinned, MapPin } from 'lucide-react';
import type { Station } from '../types/station';

interface StationListProps {
  stations: Station[];
  selectedStation: Station | null;
  onStationClick: (station: Station) => void;
}

export function StationList({ stations, selectedStation, onStationClick }: StationListProps) {
  if (stations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4 p-8">
        <div className="p-4 bg-muted/50 rounded-full">
          <MapPinned className="h-10 w-10 opacity-40" />
        </div>
        <div className="text-center">
          <p className="font-medium">No stations found</p>
          <p className="text-sm mt-1 opacity-70">Try adjusting your filter</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-2">
        {stations.map((station, index) => {
          const isSelected = selectedStation?.id === station.id;
          return (
            <div
              key={station.id}
              onClick={() => onStationClick(station)}
              className={`
                relative p-3.5 cursor-pointer rounded-lg mb-1.5 last:mb-0
                transition-all duration-200 ease-out
                group
                ${isSelected
                  ? 'bg-primary/10 shadow-sm ring-1 ring-primary/20'
                  : 'hover:bg-accent/80'
                }
              `}
              style={{ animationDelay: `${index * 20}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  p-2 rounded-lg transition-colors duration-200
                  ${isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted group-hover:bg-primary/10'
                  }
                `}>
                  <Train className={`h-4 w-4 transition-colors ${
                    isSelected ? '' : 'text-muted-foreground group-hover:text-primary'
                  }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium truncate transition-colors ${
                    isSelected ? 'text-primary' : 'text-foreground'
                  }`}>
                    {station.name}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground truncate">
                      {station.city}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <Badge className="bg-primary/15 text-primary border-0 text-xs shrink-0">
                    Active
                  </Badge>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
