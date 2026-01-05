import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CityFilter } from './CityFilter';
import type { Station } from '../types/station';

const mockStations: Station[] = [
  { id: 1, name: 'Berlin Hbf', city: 'Berlin', lat: 52.52, lng: 13.405 },
  { id: 2, name: 'Munich Hbf', city: 'Munich', lat: 48.14, lng: 11.56 },
  { id: 3, name: 'Hamburg Hbf', city: 'Hamburg', lat: 53.55, lng: 10.0 },
  { id: 4, name: 'Berlin Ostbahnhof', city: 'Berlin', lat: 52.51, lng: 13.43 },
];

describe('CityFilter', () => {
  it('renders filter label and select trigger', () => {
    const onCityChange = vi.fn();
    render(
      <CityFilter
        stations={mockStations}
        selectedCity="all"
        onCityChange={onCityChange}
      />
    );

    expect(screen.getByText('City')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('does not show clear button when no city is filtered', () => {
    const onCityChange = vi.fn();
    render(
      <CityFilter
        stations={mockStations}
        selectedCity="all"
        onCityChange={onCityChange}
      />
    );

    // X button should not be visible when "all" is selected
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(0);
  });

  it('shows clear button when a specific city is selected', () => {
    const onCityChange = vi.fn();
    render(
      <CityFilter
        stations={mockStations}
        selectedCity="Berlin"
        onCityChange={onCityChange}
      />
    );

    // X button should be visible
    const clearButton = screen.getByRole('button');
    expect(clearButton).toBeInTheDocument();
  });
});
