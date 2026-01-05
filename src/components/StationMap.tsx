import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { Station } from '../types/station';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with bundlers
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const highlightedIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [35, 55],
  iconAnchor: [17, 55],
  popupAnchor: [1, -45],
  shadowSize: [55, 55],
  className: 'highlighted-marker',
});

interface MapControllerProps {
  selectedStation: Station | null;
}

function MapController({ selectedStation }: MapControllerProps) {
  const map = useMap();

  useEffect(() => {
    if (selectedStation) {
      map.flyTo([selectedStation.latitude, selectedStation.longitude], 12, {
        duration: 1,
      });
    }
  }, [selectedStation, map]);

  return null;
}

interface StationMapProps {
  stations: Station[];
  selectedStation: Station | null;
  onStationClick: (station: Station) => void;
}

const GERMANY_CENTER: [number, number] = [51.1657, 10.4515];
const DEFAULT_ZOOM = 6;

export function StationMap({ stations, selectedStation, onStationClick }: StationMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  return (
    <MapContainer
      center={GERMANY_CENTER}
      zoom={DEFAULT_ZOOM}
      className="h-full w-full rounded-lg"
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController selectedStation={selectedStation} />
      {stations.map((station) => (
        <Marker
          key={station.id}
          position={[station.latitude, station.longitude]}
          icon={selectedStation?.id === station.id ? highlightedIcon : defaultIcon}
          eventHandlers={{
            click: () => onStationClick(station),
          }}
        >
          <Popup>
            <div className="text-center">
              <strong className="text-lg">{station.name}</strong>
              <p className="text-gray-600">{station.city}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
