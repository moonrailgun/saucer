import React from 'react';
import { SaucerEditor, SaucerEditorProvider } from '@saucerjs/editor';
import { Toolbar } from './Toolbar';

import '@saucerjs/editor/assets/default.css';
import '@saucerjs/css-editor/lib/style';

export const App: React.FC = React.memo(() => {
  return (
    <SaucerEditorProvider>
      <div
        style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
      >
        <Toolbar />

        <hr style={{ margin: 0 }} />

        <div style={{ position: 'relative', flex: 1 }}>
          <SaucerEditor />
        </div>
      </div>
    </SaucerEditorProvider>
  );
});
App.displayName = 'App';
