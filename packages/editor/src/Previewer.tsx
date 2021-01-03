import React from 'react';
import { useRenderChildren } from './hooks/useRenderChildren';

export const Previewer: React.FC = React.memo(() => {
  const el = useRenderChildren({ hasWrapper: false });

  return <div className="saucer-editor-viewport">{el}</div>;
});
Previewer.displayName = 'Previewer';
