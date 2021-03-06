import React, { useMemo } from 'react';
import {
  ASTAttrs,
  ASTNode,
  findCup,
  useSaucerDispatch,
  setNodeAttrsAction,
} from '@saucerjs/core';
import { RenderWrapper } from '../components/RenderWrapper';
import { TeaAttrsContext } from '../context/TeaAttrsContext';
import { RenderInteractiveMask } from '../components/RenderInteractiveMask';

const ChildrenContextBuilder: React.FC<{
  id: string;
  attrs: ASTAttrs;
}> = React.memo((props) => {
  const dispatch = useSaucerDispatch();

  const contextVal = useMemo(
    () => ({
      currentTeaAttrs: props.attrs,
      setCurrentTeaAttrs: (newAttrs: ASTAttrs) => {
        dispatch(setNodeAttrsAction({ nodeId: props.id, newAttrs }));
      },
    }),
    [props.id, props.attrs]
  );

  return (
    <TeaAttrsContext.Provider value={contextVal}>
      {props.children}
    </TeaAttrsContext.Provider>
  );
});
ChildrenContextBuilder.displayName = 'ChildrenContextBuilder';

export interface RenderChildrenOptions {
  hasWrapper: boolean;
}
export function renderChildren(
  children: ASTNode[],
  prefixPath = '',
  { hasWrapper = false }: RenderChildrenOptions
) {
  return children.map((node, index) => {
    const cup = findCup(node.cupName);

    if (cup === null) {
      return null;
    }

    const nodeId = node.id;
    const path = prefixPath === '' ? String(index) : `${prefixPath}.${index}`;

    let body: React.ReactNode;
    const CupRender = cup.render;
    CupRender.displayName = `SaucerElement(${cup.name})`;
    const renderInteractive = cup.renderInteractive ?? false;

    if (node.type === 'container') {
      body = (
        // TODO const { setCurrentTeaAttrs } = useCurrentTeaAction();
        // <TeaAttrsContext value={{currentTeaAttrs: node.attrs, }}></TeaAttrsContext>
        <CupRender nodeId={nodeId} node={node} path={path} attrs={node.attrs}>
          {renderChildren(node.children, path, { hasWrapper })}
        </CupRender>
      );
    } else {
      body = (
        <CupRender nodeId={nodeId} node={node} path={path} attrs={node.attrs} />
      );
    }

    if (node.type === 'leaf' && renderInteractive === false) {
      // Only for leaf node
      // Forbid to interactive with render component
      body = <RenderInteractiveMask>{body}</RenderInteractiveMask>;
    }

    // Wrap Children attrs edit context
    body = (
      <ChildrenContextBuilder id={nodeId} attrs={node.attrs}>
        {body}
      </ChildrenContextBuilder>
    );

    if (hasWrapper) {
      const disableDropEvent = cup.disableDropEvent ?? false;
      return (
        <RenderWrapper
          key={nodeId}
          path={path}
          tea={node}
          canDrop={!disableDropEvent}
        >
          {body}
        </RenderWrapper>
      );
    } else {
      return <div key={nodeId}>{body}</div>;
    }
  });
}
