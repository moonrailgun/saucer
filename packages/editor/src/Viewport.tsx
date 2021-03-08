import React from 'react';
import { useAST } from '@saucerjs/core';
import { RenderWrapper } from './components/RenderWrapper';
import { useRenderChildren } from './hooks/useRenderChildren';
import { useViewportShortcuts } from './hooks/useViewportShortcuts';

interface ViewportProps {
  style?: React.CSSProperties;
}

/**
 * Main View of User Operation to Drag and Drop
 */
export const Viewport: React.FC<ViewportProps> = React.memo((props) => {
  const el = useRenderChildren({ hasWrapper: true });
  const root = useAST();
  const { handleViewportKeyUp } = useViewportShortcuts();

  return (
    <div
      className="saucer-editor-viewport"
      style={props.style}
      tabIndex={1}
      onKeyUp={handleViewportKeyUp}
    >
      <RenderWrapper path="" tea={root}>
        {el}
      </RenderWrapper>
    </div>
  );
});
Viewport.displayName = 'Viewport';
