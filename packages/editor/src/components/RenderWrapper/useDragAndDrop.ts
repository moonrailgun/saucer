import { findCup, useASTDispatchAction } from '@saucerjs/core';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import { TemplateItemSymbol } from '../../symbol';
import type { DragObject } from '../../types';
import type { RenderWrapperProps } from './types';

/**
 * render wrapper dnd event hooks.
 */
export function useDragAndDrop(props: RenderWrapperProps) {
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
