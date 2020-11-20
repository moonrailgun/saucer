import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { TemplateItemSymbol } from '../symbol';
import classNames from 'classnames';
import type { ASTNode, ASTType } from '@saucer/core/lib/ast/types';
import { DropArea } from './DropArea';
import { DropIndicator } from './DropIndicator';
import {
  findCup,
  useASTDispatchAction,
  useCurrentTeaId,
  useSetCurrentTea,
} from '@saucer/core';
import type { DragObject } from '../types';

interface RenderWrapperProps {
  path: string;
  tea: ASTNode;
}
export const RenderWrapper: React.FC<RenderWrapperProps> = React.memo(
  (props) => {
    const { path, tea } = props;
    const type = tea.type;
    const {
      dispatchInsertAfter,
      dispatchAppendChildren,
    } = useASTDispatchAction();
    const currentSelectedTeaId = useCurrentTeaId();
    const isSelected = tea.id === currentSelectedTeaId;
    const setCurrentTea = useSetCurrentTea();

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

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setCurrentTea(tea.id);
      },
      [setCurrentTea, tea.id]
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

    let el: React.ReactNode;
    if (type === 'container') {
      el = (
        <>
          {props.children}
          {isOverCurrent && <DropIndicator name={dragName} />}
        </>
      );
    } else {
      el = (
        <>
          <DropArea path={path} position="before" />
          {props.children}
        </>
      );
    }

    return (
      <div
        ref={dropRef}
        className={classNames('saucer-render-wrapper', {
          'saucer-render-wrapper__selected': isSelected,
          'saucer-render-wrapper__hover': isOverCurrent,
        })}
        onClick={handleClick}
      >
        {el}
      </div>
    );
  }
);
RenderWrapper.displayName = 'RenderWrapper';
