import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CityFilter } from './CityFilter';
import type { Station } from '../types/station';

const mockStations: Station[] = [
  { id: 1, name: 'Berlin Hbf', city: 'Berlin', latitude: 52.52, longitude: 13.405 },
  { id: 2, name: 'Munich Hbf', city: 'Munich', latitude: 48.14, longitude: 11.56 },
  { id: 3, name: 'Hamburg Hbf', city: 'Hamburg', latitude: 53.55, longitude: 10.0 },
  { id: 4, name: 'Berlin Ostbahnhof', city: 'Berlin', latitude: 52.51, longitude: 13.43 },
];

describe('CityFilter', () => {
  it('renders all unique cities in dropdown', () => {
    const onCityChange = vi.fn();
    render(
      <CityFilter
        stations={mockStations}
        selectedCity=""
        onCityChange={onCityChange}
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    // Check that all unique cities are present
    expect(screen.getByText('All Cities')).toBeInTheDocument();
    expect(screen.getByText('Berlin')).toBeInTheDocument();
    expect(screen.getByText('Munich')).toBeInTheDocument();
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
  });

  it('calls onCityChange when a city is selected', () => {
    const onCityChange = vi.fn();
    render(
      <CityFilter
        stations={mockStations}
        selectedCity=""
        onCityChange={onCityChange}
      />
    );

    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Berlin' } });

    expect(onCityChange).toHaveBeenCalledWith('Berlin');
  });

  it('shows clear button when a city is selected', () => {
    const onCityChange = vi.fn();
    render(
      <CityFilter
        stations={mockStations}
        selectedCity="Berlin"
        onCityChange={onCityChange}
      />
    );

    const clearButton = screen.getByText('Clear');
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(onCityChange).toHaveBeenCalledWith('');
  });

  it('does not show clear button when no city is selected', () => {
    const onCityChange = vi.fn();
    render(
      <CityFilter
        stations={mockStations}
        selectedCity=""
        onCityChange={onCityChange}
      />
    );

    expect(screen.queryByText('Clear')).not.toBeInTheDocument();
  });
});
