import React from 'react';
import { findCup, useSaucerSelector } from '@saucer/core';
import type { ASTNode } from '@saucer/core/lib/ast/types';
import { RenderWrapper } from './components/RenderWrapper';

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
  const el = useViewportRender();

  return (
    <div className="saucer-editor-viewport">
      <RenderWrapper type="container" path="">
        {el}
      </RenderWrapper>
    </div>
  );
});
Viewport.displayName = 'Viewport';
