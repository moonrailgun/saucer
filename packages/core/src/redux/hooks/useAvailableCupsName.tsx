import { useMemo } from 'react';
import { useSaucerSelector } from '../context';

/**
 * Get All Available Cups Name from Context
 */
export function useAvailableCupsName(): string[] {
  const cups = useSaucerSelector((state) => state.cups.availableCup);

  return cups ?? [];
}
