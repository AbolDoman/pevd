import { useQuery } from '@tanstack/react-query';
import type { Station } from '../types/station';

const API_URL =
  'https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/train-stations.json';

async function fetchStations(): Promise<Station[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Failed to fetch stations');
  }
  return response.json();
}

export function useStationsQuery() {
  return useQuery({
    queryKey: ['stations'],
    queryFn: fetchStations,
  });
}
