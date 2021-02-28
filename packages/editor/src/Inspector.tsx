import React from 'react';
import {
  useCurrentTeaAction,
  useCurrentTeaAttrs,
  useCurrentTeaCup,
} from '@saucerjs/core';
import { TeaAttrsContext } from './context/TeaAttrsContext';

interface InspectorProps {
  style?: React.CSSProperties;
}

/**
 * Inspector of cup
 *
 * Render Cup Attrs Editor Component
 */
export const Inspector: React.FC<InspectorProps> = React.memo((props) => {
  const currentTeaAttrs = useCurrentTeaAttrs();
  const currentCup = useCurrentTeaCup();
  const { setCurrentTeaAttrs } = useCurrentTeaAction();
  const Editor = currentCup?.editor;

  return (
    <div className="saucer-editor-inspector" style={props.style}>
      <TeaAttrsContext.Provider value={{ currentTeaAttrs, setCurrentTeaAttrs }}>
        {Editor ? (
          <Editor />
        ) : (
          <div style={{ textAlign: 'center' }}>Please Select any Element</div>
        )}
      </TeaAttrsContext.Provider>
    </div>
  );
});
Inspector.displayName = 'Inspector';
