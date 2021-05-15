import {
  findCup,
  useASTDispatchAction,
  ASTNode,
  getNextPath,
  resetPathLastIndex,
} from '@saucerjs/core';
import type { ASTContainerNode } from '@saucerjs/core/lib/ast/types';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import shortid from 'shortid';
import { CupItemSymbol, TeaItemSymbol } from '../symbol';
import type { DragObject } from '../types';

interface UseDragAndDropProps {
  path: string;
  tea: ASTNode;
  canDrop: boolean;
}

/**
 * render wrapper dnd event hooks.
 */
export function useDragAndDrop(props: UseDragAndDropProps) {
  const { path, tea, canDrop } = props;
  const teaType = tea.type;
  const isRoot = path === '';
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

        const nodeId =
          typeof cup.generateNodeId === 'function'
            ? cup.generateNodeId()
            : shortid();
        let nodeAttrs = {};
        if (typeof cup.defaultAttrs !== 'undefined') {
          const defaultAttrs =
            typeof cup.defaultAttrs === 'function'
              ? cup.defaultAttrs({ nodeId })
              : cup.defaultAttrs;
          nodeAttrs = {
            ...defaultAttrs,
          };
        }

        if (teaType === 'container') {
          dispatchAppendChildren(path, cup.type, nodeId, cup.name, nodeAttrs);
        } else {
          if (hoverDirection === 'top') {
            dispatchInsertBefore(path, cup.type, nodeId, cup.name, nodeAttrs);
          } else {
            dispatchInsertAfter(path, cup.type, nodeId, cup.name, nodeAttrs);
          }
        }
      } else if (dropType === TeaItemSymbol) {
        // Move existed tea
        const fromPath = item.path!;
        const toPath = path;

        if (teaType === 'container') {
          // Move into container
          const subLastPath = resetPathLastIndex(
            `${toPath}.0`,
            (tea as ASTContainerNode).children.length
          );

          if (subLastPath.startsWith(fromPath)) {
            // Move into Self
            // Ignore it
            return;
          }
          dispatchMoveNodeByPath(fromPath, subLastPath);
        } else {
          if (hoverDirection === 'top') {
            dispatchMoveNodeByPath(fromPath, toPath);
          } else {
            dispatchMoveNodeByPath(fromPath, getNextPath(toPath));
          }
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
    canDrop: () => canDrop,
  });

  const dndRef = isRoot ? dropRef(ref) : dragRef(dropRef(ref));

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
