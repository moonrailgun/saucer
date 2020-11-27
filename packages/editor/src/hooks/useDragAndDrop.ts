import {
  findCup,
  useASTDispatchAction,
  ASTNode,
  getAfterPath,
} from '@saucerjs/core';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { CupItemSymbol, TeaItemSymbol } from '../symbol';
import type { DragObject } from '../types';

interface UseDragAndDropProps {
  path: string;
  tea: ASTNode;
}

/**
 * render wrapper dnd event hooks.
 */
export function useDragAndDrop(props: UseDragAndDropProps) {
  const { path, tea } = props;
  const teaType = tea.type;
  const {
    dispatchInsertBefore,
    dispatchInsertAfter,
    dispatchAppendChildren,
    dispatchMoveNodeByPath,
  } = useASTDispatchAction();
  const ref = useRef<HTMLDivElement>(null);
  const [hoverDirection, setHoverDirection] = useState<'bottom' | 'top'>(
    'bottom'
  );

  const handleDrop = useCallback(
    (item: DragObject) => {
      const dropType = item.type;
      if (dropType === CupItemSymbol) {
        // Create new tea
        const cupName = item.name!;
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
      } else if (dropType === TeaItemSymbol) {
        // Move existed tea
        const fromPath = item.path!;
        const toPath = path;

        if (hoverDirection === 'top') {
          dispatchMoveNodeByPath(fromPath, toPath);
        } else {
          dispatchMoveNodeByPath(fromPath, getAfterPath(toPath));
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
      dispatchMoveNodeByPath,
    ]
  );

  const [{ opacity }, dragRef] = useDrag({
    item: { type: TeaItemSymbol, path } as DragObject,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const [{ isOverCurrent, dragName }, dropRef] = useDrop({
    accept: [CupItemSymbol, TeaItemSymbol],
    drop: (item: DragObject, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        // Skip if any one handle this event.
        return;
      }

      handleDrop(item);
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

  const dndRef = dragRef(dropRef(ref));

  const dndClassName = useMemo(() => {
    if (!isOverCurrent) {
      return '';
    }

    if (teaType !== 'leaf') {
      return '';
    }

    return `saucer-render-wrapper__hover-${hoverDirection}`;
  }, [isOverCurrent, hoverDirection]);

  const dndStyle: React.CSSProperties = { opacity };

  return { dndRef, isOverCurrent, dragName, dndClassName, dndStyle };
}
