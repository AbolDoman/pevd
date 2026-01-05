import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Building2 } from "lucide-react";
import type { Station } from "../types/station";

interface CityFilterProps {
  stations: Station[];
  selectedCity: string;
  onCityChange: (city: string) => void;
}

export function CityFilter({
  stations,
  selectedCity,
  onCityChange,
}: CityFilterProps) {
  const cities = useMemo(() => {
    const uniqueCities = [...new Set(stations.map((s) => s.city))];
    return uniqueCities.sort();
  }, [stations]);

  const stationCountByCity = useMemo(() => {
    const counts: Record<string, number> = {};
    stations.forEach((s) => {
      counts[s.city] = (counts[s.city] || 0) + 1;
    });
    return counts;
  }, [stations]);

  const isFiltered = selectedCity && selectedCity !== "all";

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 text-muted-foreground mr-1">
        <Filter className="h-4 w-4" />
        <span className="text-sm font-medium hidden sm:inline">City</span>
      </div>
      <Select value={selectedCity} onValueChange={onCityChange}>
        <SelectTrigger className="w-[180px] bg-background/50 backdrop-blur-sm">
          <SelectValue placeholder="All Cities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">
            <div className="flex items-center justify-between w-full gap-3">
              <span>All Cities</span>
              <Badge variant="secondary" className="text-xs tabular-nums">
                {stations.length}
              </Badge>
            </div>
          </SelectItem>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              <div className="flex items-center justify-between w-full gap-3">
                <div className="flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
                  <span>{city}</span>
                </div>
                <Badge variant="outline" className="text-xs tabular-nums">
                  {stationCountByCity[city]}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isFiltered && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onCityChange("all")}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
