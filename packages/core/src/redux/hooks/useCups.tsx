import { useSaucerSelector } from '../context';

/**
 * Get All Cups from Context
 */
export function useCups() {
  const cups = useSaucerSelector((state) => state.cups);

  return cups ?? [];
}
