import React from 'react';
import { findCup, useSaucerSelector, useAST } from '@saucerjs/core';
import type { ASTNode } from '@saucerjs/core/lib/ast/types';
import { RenderWrapper } from './components/RenderWrapper';

function renderChildren(children: ASTNode[], prefixPath: string = '') {
  return children.map((node, index) => {
    const cup = findCup(node.cupName);

    if (cup === null) {
      return null;
    }

    const key = node.id;
    const path = prefixPath === '' ? String(index) : `${prefixPath}.${index}`;

    let body: React.ReactNode;
    if (node.type === 'container') {
      body = cup.render({
        attrs: node.attrs,
        children: <>{renderChildren(node.children, path)}</>,
      });
    } else {
      body = cup.render({
        attrs: node.attrs,
      });
    }

    return (
      <RenderWrapper key={key} path={path} tea={node}>
        {body}
      </RenderWrapper>
    );
  });
}

function useViewportRender(): React.ReactNode {
  const ast = useSaucerSelector((state) => state.ast);

  return <>{renderChildren(ast.children)}</>;
}

/**
 * Main View of User Operation to Drag and Drop
 */
export const Viewport: React.FC = React.memo(() => {
  const el = useViewportRender();
  const root = useAST();

  return (
    <div className="saucer-editor-viewport">
      <RenderWrapper path="" tea={root}>
        {el}
      </RenderWrapper>
    </div>
  );
});
Viewport.displayName = 'Viewport';
