import React from 'react';
import { useRenderChildren } from './hooks/useRenderChildren';

interface PreviewerProps {
  style?: React.CSSProperties;
}
export const Previewer: React.FC<PreviewerProps> = React.memo((props) => {
  const el = useRenderChildren({ hasWrapper: false });

  return (
    <div className="saucer-editor-viewport" style={props.style}>
      {el}
    </div>
  );
});
Previewer.displayName = 'Previewer';
