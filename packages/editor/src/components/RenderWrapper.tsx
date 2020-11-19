import React from 'react';
import { useDrop } from 'react-dnd';
import { TemplateItemSymbol } from '../symbol';
import classNames from 'classnames';
import type { ASTType } from '@saucer/core/lib/ast/types';
import { DropArea } from './DropArea';

interface RenderWrapperProps {
  type: ASTType;
  path: string;
}
export const RenderWrapper: React.FC<RenderWrapperProps> = React.memo(
  (props) => {
    const { type, path } = props;
    // const [{ clientOffset, isOverCurrent }, dropRef] = useDrop({
    //   accept: [TemplateItemSymbol],
    //   drop: (item, monitor) => {
    //     const didDrop = monitor.didDrop();
    //     if (didDrop) {
    //       return;
    //     }

    //     console.log('drop', item);
    //   },
    //   collect: (monitor) => ({
    //     clientOffset: monitor.getSourceClientOffset(),
    //     isOverCurrent: monitor.isOver({ shallow: true }),
    //   }),
    // });

    return (
      <div
        className="saucer-render-wrapper"
        // ref={dropRef}
        // className={classNames('saucer-render-wrapper', {
        //   'saucer-render-wrapper__over': isOverCurrent,
        // })}
      >
        <DropArea path="0" />
        {props.children}
        <DropArea path="1" />
      </div>
    );
  }
);
RenderWrapper.displayName = 'RenderWrapper';
