import { useAST } from '@saucerjs/core';
import React, { useCallback } from 'react';
import { Button } from 'antd';

export const Toolbar: React.FC = React.memo(() => {
  const ast = useAST();

  const handleOutputState = useCallback(() => {
    console.log(JSON.stringify(ast, null, 2));
  }, [ast]);

  return (
    <div style={{ padding: '6px 12px' }}>
      <Button type="primary" onClick={handleOutputState}>
        Output State in Console
      </Button>
    </div>
  );
});
Toolbar.displayName = 'Toolbar';
