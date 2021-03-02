import type { ASTAttrs } from './ast/types';

export interface CupType {
  /**
   * Uniq name
   */
  name: string;

  /**
   * DisplayName
   */
  displayName?: string;

  /**
   * Cup type
   */
  type: 'container' | 'leaf';

  /**
   * Hover and preview component
   * Display in a popover
   */
  preview?: React.ComponentType<{}>;

  /**
   * Define how to render
   */
  render: React.ComponentType<{
    nodeId: string;
    attrs: ASTAttrs;
    children?: React.ReactNode;
  }>;

  /**
   * Whether render can interactive in viewport
   * Default is false
   */
  renderInteractive?: boolean;

  /**
   * Describe
   */
  desc?: React.ReactNode;

  /**
   * Which attrs can be editor
   */
  editor?: React.ComponentType<{}>;
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
