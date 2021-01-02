import React from 'react';
import { useSaucerSelector, useAST } from '@saucerjs/core';
import { RenderWrapper } from './components/RenderWrapper';
import { renderChildren } from './render/renderChildren';

function useViewportRender(): React.ReactNode {
  const ast = useSaucerSelector((state) => state.ast);

  return <>{renderChildren(ast.children, '', true)}</>;
}

/**
 * Main View of User Operation to Drag and Drop
 */
export const Viewport: React.FC = React.memo(() => {
  const el = useViewportRender();
  const root = useAST();

  return (
    <div className="saucer-editor-viewport">
      <RenderWrapper path="" tea={root}>
        {el}
      </RenderWrapper>
    </div>
  );
});
Viewport.displayName = 'Viewport';
