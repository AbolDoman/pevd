import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StationList } from './StationList';
import type { Station } from '../types/station';

const mockStations: Station[] = [
  { id: 1, name: 'Berlin Hbf', city: 'Berlin', lat: 52.52, lng: 13.405 },
  { id: 2, name: 'Munich Hbf', city: 'Munich', lat: 48.14, lng: 11.56 },
  { id: 3, name: 'Hamburg Hbf', city: 'Hamburg', lat: 53.55, lng: 10.0 },
];

describe('StationList', () => {
  it('renders all stations with name and city', () => {
    const onStationClick = vi.fn();
    render(
      <StationList
        stations={mockStations}
        selectedStation={null}
        onStationClick={onStationClick}
      />
    );

    expect(screen.getByText('Berlin Hbf')).toBeInTheDocument();
    expect(screen.getByText('Berlin')).toBeInTheDocument();
    expect(screen.getByText('Munich Hbf')).toBeInTheDocument();
    expect(screen.getByText('Munich')).toBeInTheDocument();
    expect(screen.getByText('Hamburg Hbf')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
  });

  it('shows empty state when no stations', () => {
    const onStationClick = vi.fn();
    render(
      <StationList
        stations={[]}
        selectedStation={null}
        onStationClick={onStationClick}
      />
    );

    expect(screen.getByText('No stations found')).toBeInTheDocument();
  });

  it('calls onStationClick when a station is clicked', () => {
    const onStationClick = vi.fn();
    render(
      <StationList
        stations={mockStations}
        selectedStation={null}
        onStationClick={onStationClick}
      />
    );

    fireEvent.click(screen.getByText('Berlin Hbf'));
    expect(onStationClick).toHaveBeenCalledWith(mockStations[0]);
  });

  it('shows Active badge for selected station', () => {
    const onStationClick = vi.fn();
    render(
      <StationList
        stations={mockStations}
        selectedStation={mockStations[0]}
        onStationClick={onStationClick}
      />
    );

    expect(screen.getByText('Active')).toBeInTheDocument();
  });
});
