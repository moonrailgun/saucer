import React, { useCallback } from 'react';
import classNames from 'classnames';
import type { ASTNode } from '@saucerjs/core';
import { DropIndicator } from '../DropIndicator';
import { useCurrentTeaId, useCurrentTeaAction } from '@saucerjs/core';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';

interface RenderWrapperProps {
  path: string;
  tea: ASTNode;
}
export const RenderWrapper: React.FC<RenderWrapperProps> = React.memo(
  (props) => {
    const { path, tea } = props;
    const type = tea.type;
    const isRoot = path === '';
    const currentSelectedTeaId = useCurrentTeaId();
    const isSelected = tea.id === currentSelectedTeaId;
    const { setCurrentTeaId } = useCurrentTeaAction();

    const {
      dndRef,
      isOverCurrent,
      dragName,
      dndClassName,
      dndStyle,
    } = useDragAndDrop({
      path,
      tea,
    });

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setCurrentTeaId(tea.id);
      },
      [setCurrentTeaId, tea.id]
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
        ref={!isRoot ? (dndRef as any) : undefined}
        className={classNames(dndClassName, 'saucer-render-wrapper', {
          'saucer-render-wrapper__selected': isSelected,
          'saucer-render-wrapper__hover': isOverCurrent,
        })}
        style={dndStyle}
        onClick={handleClick}
      >
        {el}
      </div>
    );
  }
);
RenderWrapper.displayName = 'RenderWrapper';
