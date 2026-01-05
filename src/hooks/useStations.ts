import { useState, useEffect } from 'react';
import type { Station } from '../types/station';

const API_URL = 'https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/train-stations.json';

interface UseStationsReturn {
  stations: Station[];
  loading: boolean;
  error: string | null;
}

export function useStations(): UseStationsReturn {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch stations');
        }
        const data = await response.json();
        setStations(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  return { stations, loading, error };
}
