import React from 'react';
import { SaucerEditor } from '@saucer/editor';

export const App: React.FC = React.memo(() => {
  return (
    <div>
      <SaucerEditor />
    </div>
  );
});
App.displayName = 'App';
