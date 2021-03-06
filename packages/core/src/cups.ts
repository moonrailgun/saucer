import type { ASTAttrs, ASTNode } from './ast/types';

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
   * A Function which create nodeId
   *
   * @default shortid()
   */
  generateNodeId?: () => string;

  /**
   * Default Component Attrs
   */
  defaultAttrs?: ASTAttrs | ((info: { nodeId: string }) => ASTAttrs);

  /**
   * Define how to render
   */
  render: React.ComponentType<{
    nodeId: string;
    /**
     * Origin AST Node
     */
    node: ASTNode;
    /**
     * Current Node Path
     */
    path: string;
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

  /**
   * Disable Drop Event
   * @default false
   */
  disableDropEvent?: boolean;
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
