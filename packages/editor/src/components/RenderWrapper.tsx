import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { TemplateItemSymbol } from '../symbol';
import classNames from 'classnames';
import type { ASTType } from '@saucer/core/lib/ast/types';
import { DropArea } from './DropArea';
import { DropIndicator } from './DropIndicator';
import { findCup, useASTDispatchAction } from '@saucer/core';
import type { DragObject } from '../types';

interface RenderWrapperProps {
  type: ASTType;
  path: string;
}
export const RenderWrapper: React.FC<RenderWrapperProps> = React.memo(
  (props) => {
    const { type, path } = props;
    const {
      dispatchInsertAfter,
      dispatchAppendChildren,
    } = useASTDispatchAction();

    const handleDrop = useCallback(
      (cupName: string) => {
        const cup = findCup(cupName);
        if (cup === null) {
          console.error('Cannot find cup by name:' + cupName);
          return;
        }

        if (type === 'container') {
          dispatchAppendChildren(path, cup.type, cup.name);
        } else {
          dispatchInsertAfter(path, cup.type, cup.name);
        }
      },
      [type, path, dispatchInsertAfter, dispatchAppendChildren]
    );

    const [{ isOverCurrent, dragName }, dropRef] = useDrop({
      accept: [TemplateItemSymbol],
      drop: (item: DragObject, monitor) => {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }

        handleDrop(item.name);
      },
      collect: (monitor) => ({
        isOverCurrent: monitor.isOver({ shallow: true }),
        dragName: monitor.getItem()?.name,
      }),
    });

    if (type === 'container') {
      return (
        <div className="saucer-render-wrapper" ref={dropRef}>
          {props.children}

          {isOverCurrent && <DropIndicator name={dragName} />}
        </div>
      );
    }

    return (
      <div className="saucer-render-wrapper">
        <DropArea path={path} position="before" />
        {props.children}
      </div>
    );
  }
);
RenderWrapper.displayName = 'RenderWrapper';
