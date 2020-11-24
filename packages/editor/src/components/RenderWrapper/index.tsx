import React, { useCallback } from 'react';
import classNames from 'classnames';
import type { ASTNode } from '@saucer/core';
import { DropIndicator } from '../DropIndicator';
import { useCurrentTeaId, useSetCurrentTea } from '@saucer/core';
import { useDragAndDrop } from './useDragAndDrop';

interface RenderWrapperProps {
  path: string;
  tea: ASTNode;
}
export const RenderWrapper: React.FC<RenderWrapperProps> = React.memo(
  (props) => {
    const { tea } = props;
    const type = tea.type;
    const currentSelectedTeaId = useCurrentTeaId();
    const isSelected = tea.id === currentSelectedTeaId;
    const setCurrentTea = useSetCurrentTea();

    const { dndRef, isOverCurrent, dragName, dndClassName } = useDragAndDrop(
      props
    );

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setCurrentTea(tea.id);
      },
      [setCurrentTea, tea.id]
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
        ref={dndRef as any}
        className={classNames(dndClassName, 'saucer-render-wrapper', {
          'saucer-render-wrapper__selected': isSelected,
          'saucer-render-wrapper__hover': isOverCurrent,
        })}
        onClick={handleClick}
      >
        {el}
      </div>
    );
  }
);
RenderWrapper.displayName = 'RenderWrapper';
