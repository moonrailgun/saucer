import { findCup, useASTDispatchAction, useSaucerSelector } from '@saucer/core';
import type { ASTNode } from '@saucer/core/lib/ast/types';
import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { DropIndicator } from './components/DropIndicator';
import { RenderWrapper } from './components/RenderWrapper';
import { TemplateItemSymbol } from './symbol';
import type { DragObject } from './types';

function useViewportDrop() {
  const { dispatchInsertBefore } = useASTDispatchAction();

  const handleDrop = useCallback(
    (cupName: string) => {
      const cup = findCup(cupName);
      if (cup !== null) {
        dispatchInsertBefore('0', cup.type, cup.name);
      }
    },
    [dispatchInsertBefore]
  );

  const [{ dragName, canDrop, isOver }, dropRef] = useDrop({
    accept: [TemplateItemSymbol],
    drop: (item: DragObject, monitor) => {
      // If someone handle drop event, skip it
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }

      const name = item.name;
      if (typeof name === 'string') {
        handleDrop(name);
      }
    },
    collect: (monitor) => ({
      dragName: monitor.getItem()?.name,
      isOver: monitor.isOver({ shallow: true }),
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

function renderChildrens(childrens: ASTNode[], prefixPath: string = '') {
  return childrens.map((node, index) => {
    const cup = findCup(node.cupName);

    if (cup === null) {
      return null;
    }

    const key = node.id;
    const path = prefixPath === '' ? String(index) : `${prefixPath}.${index}`;

    if (node.type === 'container') {
      return (
        <RenderWrapper key={key} type="container" path={path}>
          {cup.render({
            attrs: node.attrs,
            children: <>{renderChildrens(node.childrens, path)}</>,
          })}
        </RenderWrapper>
      );
    } else {
      return (
        <RenderWrapper key={key} type="leaf" path={path}>
          {cup.render({
            attrs: node.attrs,
          })}
        </RenderWrapper>
      );
    }
  });
}

function useViewportRender(): React.ReactNode {
  const ast = useSaucerSelector((state) => state.ast);

  return <>{renderChildrens(ast.childrens)}</>;
}

/**
 * Main View of User Operation to Drag and Drop
 */
export const Viewport: React.FC = React.memo(() => {
  const { dropRef, dragName, isActive } = useViewportDrop();
  const el = useViewportRender();

  return (
    <div className="saucer-editor-viewport" ref={dropRef}>
      {el}

      {isActive && <DropIndicator name={dragName} />}
    </div>
  );
});
Viewport.displayName = 'Viewport';
