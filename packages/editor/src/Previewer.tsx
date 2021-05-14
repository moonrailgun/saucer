import React, { useMemo } from 'react';
import { TeaRenderOptionsContext } from './context/TeaRenderOptionsContext';
import { useRenderChildren } from './hooks/useRenderChildren';

interface PreviewerProps {
  style?: React.CSSProperties;
}
export const Previewer: React.FC<PreviewerProps> = React.memo((props) => {
  const options = useMemo(() => ({ hasWrapper: false }), []);
  const el = useRenderChildren(options);

  return (
    <TeaRenderOptionsContext.Provider value={options}>
      <div className="saucer-editor-previewer" style={props.style}>
        {el}
      </div>
    </TeaRenderOptionsContext.Provider>
  );
});
Previewer.displayName = 'Previewer';
