import React from 'react';
import { useSaucerSelector } from '@saucerjs/core';
import { renderChildren } from '../render/renderChildren';

/**
 * Common Render AST Children
 */
interface UseRenderChildrenOptions {
  hasWrapper: boolean;
}
export function useRenderChildren(options: UseRenderChildrenOptions) {
  const ast = useSaucerSelector((state) => state.ast);

  return <>{renderChildren(ast.children, '', options.hasWrapper)}</>;
}
