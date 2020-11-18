import React from 'react';
import { SaucerProvider } from '@saucer/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const SaucerEditorProvider: React.FC = React.memo((props) => {
  return (
    <SaucerProvider>
      <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>
    </SaucerProvider>
  );
});
SaucerEditorProvider.displayName = 'SaucerEditorProvider';
