import React from 'react';
import { SaucerEditor } from '@saucer/editor';
import '@saucer/editor/lib/default.css';

export const App: React.FC = React.memo(() => {
  return (
    <div style={{ height: '100vh' }}>
      <SaucerEditor />
    </div>
  );
});
App.displayName = 'App';
