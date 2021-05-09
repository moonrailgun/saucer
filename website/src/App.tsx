import React from 'react';
import type { ASTContainerNode } from '@saucerjs/core';
import { SaucerEditor, SaucerEditorProvider } from '@saucerjs/editor';
import { Toolbar } from './Toolbar';
import { availableCup } from './init';
import shortid from 'shortid';

import '@saucerjs/editor/assets/default.css';
import '@saucerjs/css-editor/lib/style';

const initialAST: ASTContainerNode = {
  id: 'root',
  type: 'container',
  cupName: 'root',
  attrs: {},
  children: [
    {
      id: shortid(),
      type: 'container',
      cupName: 'Tabs',
      attrs: {},
      children: [
        {
          id: shortid(),
          type: 'container',
          cupName: 'TabPanel',
          attrs: {},
          children: [],
        },
        {
          id: shortid(),
          type: 'container',
          cupName: 'TabPanel',
          attrs: {},
          children: [],
        },
      ],
    },
  ],
};

export const App: React.FC = React.memo(() => {
  return (
    <SaucerEditorProvider initialAST={initialAST}>
      <div
        style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Toolbar />

        <hr style={{ margin: 0 }} />

        <div style={{ position: 'relative', flex: 1 }}>
          <SaucerEditor cupNames={availableCup} />
        </div>
      </div>
    </SaucerEditorProvider>
  );
});
App.displayName = 'App';
