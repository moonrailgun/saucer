import React from 'react';
import { Editor } from '@saucer/editor';

export const App: React.FC = React.memo(() => {
  return (
    <div>
      <Editor />
    </div>
  );
});
App.displayName = 'App';
