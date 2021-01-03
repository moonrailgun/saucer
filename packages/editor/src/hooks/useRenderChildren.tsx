import React, { useMemo } from 'react';
import {
  ASTAttrs,
  ASTNode,
  findCup,
  useSaucerDispatch,
  useSaucerSelector,
} from '@saucerjs/core';
import { RenderWrapper } from '../components/RenderWrapper';
import { TeaAttrsContext } from '../context/TeaAttrsContext';
import { setNodeAttrsAction } from '@saucerjs/core';

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

    const teaContextValue = {
      currentTeaAttrs: node.attrs,
      setCurrentTeaAttrs: () => {},
    };

    if (node.type === 'container') {
      body = (
        // TODO const { setCurrentTeaAttrs } = useCurrentTeaAction();
        // <TeaAttrsContext value={{currentTeaAttrs: node.attrs, }}></TeaAttrsContext>
        <CupRender attrs={node.attrs}>
          {renderChildren(node.children, path, hasWrapper)}
        </CupRender>
      );
    } else {
      body = <CupRender attrs={node.attrs} />;
    }

    // Wrap Children attrs edit context
    body = (
      <ChildrenContextBuilder id={node.id} attrs={node.attrs}>
        {body}
      </ChildrenContextBuilder>
    );

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

/**
 * Common Render AST Children
 */
interface UseRenderChildrenOptions {
  hasWrapper: boolean;
}
export function useRenderChildren(options: UseRenderChildrenOptions) {
  const ast = useSaucerSelector((state) => state.ast);

  return <>{renderChildren(ast.children, '', options.hasWrapper)}</>;
}
