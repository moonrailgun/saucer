import { useSaucerSelector } from '@saucerjs/core';
import React from 'react';
import { renderChildren } from './render/renderChildren';

function useViewportRender(): React.ReactNode {
  const ast = useSaucerSelector((state) => state.ast);

  return <>{renderChildren(ast.children, '', false)}</>;
}

export const Previewer: React.FC = React.memo(() => {
  const el = useViewportRender();

  return <div className="saucer-editor-viewport">{el}</div>;
});
Previewer.displayName = 'Previewer';
