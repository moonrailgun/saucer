import React from 'react';
import { SaucerEditor } from '@saucerjs/editor';
import '@saucerjs/editor/lib/default.css';
import '@saucerjs/css-editor/lib/style';

export const App: React.FC = React.memo(() => {
  return (
    <div style={{ height: '100vh' }}>
      <SaucerEditor />
    </div>
  );
});
App.displayName = 'App';
