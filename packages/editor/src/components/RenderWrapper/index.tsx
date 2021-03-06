import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import type { ASTNode } from '@saucerjs/core';
import { DropIndicator } from '../DropIndicator';
import { useCurrentTeaId, useCurrentTeaAction } from '@saucerjs/core';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';
import { RenderWrapperTools } from './tools';

interface RenderWrapperProps {
  path: string;
  tea: ASTNode;
  canDrop?: boolean;
}
export const RenderWrapper: React.FC<RenderWrapperProps> = React.memo(
  (props) => {
    const { path, tea, canDrop = true } = props;
    const type = tea.type;
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
      canDrop,
    });

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation();
        setCurrentTeaId(tea.id);
      },
      [setCurrentTeaId, tea.id]
    );

    const el = useMemo(() => {
      if (type === 'container') {
        return (
          <>
            {props.children}
            {isOverCurrent && <DropIndicator name={dragName} />}
          </>
        );
      } else {
        return <>{props.children}</>;
      }
    }, [type, props.children, isOverCurrent, dragName]);

    return (
      <div
        ref={dndRef as any}
        className={classNames(dndClassName, 'saucer-render-wrapper', {
          'saucer-render-wrapper__selected': isSelected,
          'saucer-render-wrapper__hover': isOverCurrent,
        })}
        style={dndStyle}
        onClick={handleClick}
      >
        {el}

        {isSelected && currentSelectedTeaId !== 'root' && (
          <RenderWrapperTools />
        )}
      </div>
    );
  }
);
RenderWrapper.displayName = 'RenderWrapper';
