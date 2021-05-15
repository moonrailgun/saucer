import React from 'react';
import { SaucerProvider, BuildSaucerStoreOptions } from '@saucerjs/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const SaucerEditorProvider: React.FC<BuildSaucerStoreOptions> = React.memo(
  (props) => {
    return (
      <SaucerProvider {...props}>
        <DndProvider backend={HTML5Backend}>{props.children}</DndProvider>
      </SaucerProvider>
    );
  }
);
SaucerEditorProvider.displayName = 'SaucerEditorProvider';
