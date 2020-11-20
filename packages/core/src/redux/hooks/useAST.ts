import type { ASTContainerNode } from '../../ast/types';
import { useSaucerSelector } from '../context';

export function useAST(): ASTContainerNode {
  const ast = useSaucerSelector((state) => state.ast);

  return ast;
}
