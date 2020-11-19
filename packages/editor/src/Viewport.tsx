import { findCup } from '@saucer/core';
import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { DropIndicator } from './components/DropIndicator';
import { TemplateItemSymbol } from './symbol';
import { DragObject } from './types';

function useViewportDrop() {
  const handleDrop = useCallback((cupName: string) => {
    const cup = findCup(cupName);
    if (cup !== null) {
      console.log('cup', cup);
    }
  }, []);

  const [{ dragName, canDrop, isOver }, dropRef] = useDrop({
    accept: [TemplateItemSymbol],
    drop: (item: DragObject, monitor) => {
      const name = item.name;
      if (typeof name === 'string') {
        handleDrop(name);
      }
    },
    collect: (monitor) => ({
      dragName: monitor.getItem()?.name,
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  return {
    dropRef,
    dragName,
    isActive,
  };
}

/**
 * Main View of User Operation to Drag and Drop
 */
export const Viewport: React.FC = React.memo(() => {
  const { dropRef, dragName, isActive } = useViewportDrop();

  return (
    <div className="saucer-editor-viewport" ref={dropRef}>
      {isActive && <DropIndicator name={dragName} />}
    </div>
  );
});
Viewport.displayName = 'Viewport';
