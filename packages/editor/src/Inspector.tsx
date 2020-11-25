import React from 'react';
import { useCurrentTeaAttrs, useCurrentTeaCup } from '@saucer/core';
import { TeaAttrsContext } from './context/TeaAttrsContext';

export const Inspector: React.FC = React.memo(() => {
  const currentTeaAttrs = useCurrentTeaAttrs();
  const currentCup = useCurrentTeaCup();
  const Editor = currentCup?.editor;

  return (
    <div className="saucer-editor-inspector">
      <p>Saucer Layout Inspector</p>

      <TeaAttrsContext.Provider value={currentTeaAttrs}>
        {Editor && <Editor />}
      </TeaAttrsContext.Provider>
    </div>
  );
});
