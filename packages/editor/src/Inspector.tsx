import React from 'react';
import {
  useCurrentTeaAction,
  useCurrentTeaAttrs,
  useCurrentTeaCup,
} from '@saucerjs/core';
import { TeaAttrsContext } from './context/TeaAttrsContext';

/**
 * Inspector of cup
 *
 * Render Cup Attrs Editor Component
 */
export const Inspector: React.FC = React.memo(() => {
  const currentTeaAttrs = useCurrentTeaAttrs();
  const currentCup = useCurrentTeaCup();
  const { setCurrentTeaAttrs } = useCurrentTeaAction();
  const Editor = currentCup?.editor;

  return (
    <div className="saucer-editor-inspector">
      <p>Saucer Layout Inspector</p>

      <TeaAttrsContext.Provider value={{ currentTeaAttrs, setCurrentTeaAttrs }}>
        {Editor && <Editor />}
      </TeaAttrsContext.Provider>
    </div>
  );
});
