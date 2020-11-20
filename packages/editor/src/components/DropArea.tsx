import { findCup, useASTDispatchAction } from '@saucer/core';
import classNames from 'classnames';
import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import type { DragObject } from '../types';
import { TemplateItemSymbol } from '../symbol';

interface DropAreaProps {
  path: string;
  position: 'before' | 'after';
}
export const DropArea: React.FC<DropAreaProps> = React.memo((props) => {
  const { path, position } = props;
  const { dispatchInsertBefore, dispatchInsertAfter } = useASTDispatchAction();

  const handleDrop = useCallback(
    (cupName) => {
      const cup = findCup(cupName);
      if (cup === null) {
        console.error('Cannot find cup by name:' + cupName);
        return;
      }

      if (position === 'before') {
        dispatchInsertBefore(path, cup.type, cup.name);
      } else {
        dispatchInsertAfter(path, cup.type, cup.name);
      }
    },
    [position, dispatchInsertBefore, dispatchInsertAfter]
  );

  const [{ isOver, show }, dropRef] = useDrop({
    accept: TemplateItemSymbol,
    drop: (item: DragObject, monitor) => {
      handleDrop(item.name);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      show: monitor.canDrop(),
    }),
  });

  return (
    <div
      ref={dropRef}
      className={classNames('saucer-drop-area', {
        'saucer-drop-area__over': isOver,
        'saucer-drop-area__show': show,
      })}
    >
      Drop here
    </div>
  );
});
DropArea.displayName = 'DropArea';
