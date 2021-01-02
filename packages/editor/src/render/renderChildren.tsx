import { ASTNode, findCup } from '@saucerjs/core';
import React from 'react';
import { RenderWrapper } from '../components/RenderWrapper';

export function renderChildren(
  children: ASTNode[],
  prefixPath = '',
  hasWrapper = false
) {
  return children.map((node, index) => {
    const cup = findCup(node.cupName);

    if (cup === null) {
      return null;
    }

    const key = node.id;
    const path = prefixPath === '' ? String(index) : `${prefixPath}.${index}`;

    let body: React.ReactNode;
    const CupRender = cup.render;
    if (node.type === 'container') {
      body = (
        <CupRender attrs={node.attrs}>
          {renderChildren(node.children, path, hasWrapper)}
        </CupRender>
      );
    } else {
      body = <CupRender attrs={node.attrs} />;
    }

    if (hasWrapper) {
      return (
        <RenderWrapper key={key} path={path} tea={node}>
          {body}
        </RenderWrapper>
      );
    } else {
      return <div>{body}</div>;
    }
  });
}
