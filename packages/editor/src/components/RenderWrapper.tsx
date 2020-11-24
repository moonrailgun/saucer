import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { TemplateItemSymbol } from '../symbol';
import classNames from 'classnames';
import type { ASTNode } from '@saucer/core/lib/ast/types';
import { DropIndicator } from './DropIndicator';
import {
  findCup,
  useASTDispatchAction,
  useCurrentTeaId,
  useSetCurrentTea,
} from '@saucer/core';
import type { DragObject } from '../types';

function useDragAndDrop(props: RenderWrapperProps) {
  const { path, tea } = props;
  const teaType = tea.type;
  const {
    dispatchInsertBefore,
    dispatchInsertAfter,
    dispatchAppendChildren,
  } = useASTDispatchAction();
  const ref = useRef<HTMLDivElement>(null);
  const [hoverDirection, setHoverDirection] = useState<'bottom' | 'top'>(
    'bottom'
  );

  const handleDrop = useCallback(
    (cupName: string) => {
      const cup = findCup(cupName);
      if (cup === null) {
        console.error('Cannot find cup by name:' + cupName);
        return;
      }

      if (teaType === 'container') {
        dispatchAppendChildren(path, cup.type, cup.name);
      } else {
        if (hoverDirection === 'top') {
          dispatchInsertBefore(path, cup.type, cup.name);
        } else {
          dispatchInsertAfter(path, cup.type, cup.name);
        }
      }
    },
    [
      teaType,
      path,
      hoverDirection,
      dispatchInsertBefore,
      dispatchInsertAfter,
      dispatchAppendChildren,
    ]
  );

  const [{ isOverCurrent, dragName }, dropRef] = useDrop({
    accept: [TemplateItemSymbol],
    drop: (item: DragObject, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        // Skip if any one handle this event.
        return;
      }

      handleDrop(item.name);
    },
    hover: (item, monitor) => {
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      if (!hoverBoundingRect) {
        return;
      }

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      if (clientOffset === null) {
        return;
      }

      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      const direction = hoverClientY > hoverMiddleY ? 'bottom' : 'top';
      setHoverDirection(direction);
    },
    collect: (monitor) => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
      dragName: monitor.getItem()?.name,
    }),
  });

  const dndRef = dropRef(ref);

  const dndClassName = useMemo(() => {
    if (!isOverCurrent) {
      return '';
    }

    if (teaType !== 'leaf') {
      return '';
    }

    return `saucer-render-wrapper__hover-${hoverDirection}`;
  }, [isOverCurrent, hoverDirection]);

  return { dndRef, isOverCurrent, dragName, dndClassName };
}

interface RenderWrapperProps {
  path: string;
  tea: ASTNode;
}
export const RenderWrapper: React.FC<RenderWrapperProps> = React.memo(
  (props) => {
    const { tea } = props;
    const type = tea.type;
    const currentSelectedTeaId = useCurrentTeaId();
    const isSelected = tea.id === currentSelectedTeaId;
    const setCurrentTea = useSetCurrentTea();

    const { dndRef, isOverCurrent, dragName, dndClassName } = useDragAndDrop(
      props
    );

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setCurrentTea(tea.id);
      },
      [setCurrentTea, tea.id]
    );

    let el: React.ReactNode;
    if (type === 'container') {
      el = (
        <>
          {props.children}
          {isOverCurrent && <DropIndicator name={dragName} />}
        </>
      );
    } else {
      el = <>{props.children}</>;
    }

    return (
      <div
        ref={dndRef as any}
        className={classNames(dndClassName, 'saucer-render-wrapper', {
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
