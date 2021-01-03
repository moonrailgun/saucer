import React from 'react';
import { useAST } from '@saucerjs/core';
import { RenderWrapper } from './components/RenderWrapper';
import { useRenderChildren } from './hooks/useRenderChildren';

/**
 * Main View of User Operation to Drag and Drop
 */
export const Viewport: React.FC = React.memo(() => {
  const el = useRenderChildren({ hasWrapper: true });
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
