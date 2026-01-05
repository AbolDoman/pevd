# German Train Stations Map

A React application that visualizes train stations in Germany on an interactive Leaflet map.

## Features

- **Interactive Map**: Display all stations on a Leaflet map centered on Germany
- **Station List**: Scrollable list showing station name and city
- **City Filter**: Dropdown to filter stations by city
- **Click Interaction**: Click on a station in the list to zoom and highlight it on the map
- **Loading & Error States**: Proper handling of API loading and error states
- **Responsive Design**: Works on both desktop and mobile devices

## Tech Stack

- React 19 + TypeScript
- Vite
- Leaflet + React-Leaflet
- Tailwind CSS
- Vitest + React Testing Library

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Project Structure

```
src/
├── components/
│   ├── CityFilter.tsx      # City dropdown filter
│   ├── StationList.tsx     # List of stations
│   ├── StationMap.tsx      # Leaflet map component
│   ├── LoadingSpinner.tsx  # Loading state
│   └── ErrorMessage.tsx    # Error state
├── hooks/
│   └── useStations.ts      # API data fetching hook
├── types/
│   └── station.ts          # TypeScript interfaces
└── App.tsx                 # Main application
```

## API

Data is fetched from: https://gist.github.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c

## Deploy to Vercel

1. Push this code to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Vercel will auto-detect Vite and deploy
