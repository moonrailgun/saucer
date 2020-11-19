import type { ASTAttrs } from './ast/types';

export interface CupType {
  name: string;
  displayName?: string;
  type: 'container' | 'leaf';
  render: React.FC<{
    attrs: ASTAttrs;
    children?: React.ReactNode;
  }>;
  desc?: React.ReactNode;
  editor?: React.FC;
}

type CupMapType = Map<string, CupType>;

const cupMap: CupMapType = new Map<string, CupType>();

/**
 * Register Cup into cupMap
 * @param cup A Cup
 */
export function regCup(cup: CupType) {
  cupMap.set(cup.name, cup);
}

export function getAllCup(): CupMapType {
  return cupMap;
}

export function findCup(cupName: string): CupType | null {
  return cupMap.get(cupName) ?? null;
}
