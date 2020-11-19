import { useASTDispatchAction } from '@saucer/core';
import classNames from 'classnames';
import React from 'react';
import { useDrop } from 'react-dnd';
import { TemplateItemSymbol } from '../symbol';

interface DropAreaProps {
  path: string;
}
export const DropArea: React.FC<DropAreaProps> = React.memo((props) => {
  const { path } = props;
  const { dispatchInsertBefore } = useASTDispatchAction();

  const [{ isOver, show }, dropRef] = useDrop({
    accept: TemplateItemSymbol,
    drop: (item, monitor) => {
      console.log('path', path);
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
