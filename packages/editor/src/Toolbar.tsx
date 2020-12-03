import { useAST } from '@saucerjs/core';
import React, { useCallback } from 'react';

export const Toolbar: React.FC = React.memo(() => {
  const ast = useAST();

  const handleOutputState = useCallback(() => {
    console.log(JSON.stringify(ast, null, 2));
  }, [ast]);

  return <button onClick={handleOutputState}>Output State in Console</button>;
});
Toolbar.displayName = 'Toolbar';
