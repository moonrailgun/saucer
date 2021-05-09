import React from 'react';
import { useSaucerSelector } from '@saucerjs/core';
import {
  renderChildren,
  RenderChildrenOptions,
} from '../render/renderChildren';

/**
 * Common Render AST Children
 */
export function useRenderChildren(options: RenderChildrenOptions) {
  const ast = useSaucerSelector((state) => state.ast);

  return <>{renderChildren(ast.children, '', options)}</>;
}
