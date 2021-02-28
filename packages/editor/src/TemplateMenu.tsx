import React from 'react';
import { findCup, useAvailableCupsName, CupType } from '@saucerjs/core';
import { useDrag } from 'react-dnd';
import { CupItemSymbol } from './symbol';
import type { DragObject } from './types';
import Popover from 'antd/lib/popover';
import _isNil from 'lodash/isNil';

const TemplateMenuItem: React.FC<{
  cup: CupType;
}> = React.memo((props) => {
  const { cup } = props;
  const [{ opacity }, dragRef] = useDrag({
    item: { type: CupItemSymbol, name: cup.name } as DragObject,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  const body = (
    <div
      className="saucer-template-menu__item"
      ref={dragRef}
      style={{ opacity }}
    >
      <div>{cup.displayName ?? cup.name}</div>
      {cup.desc && <small>{cup.desc}</small>}
    </div>
  );

  const Preview = cup.preview;

  return !_isNil(Preview) ? (
    <Popover placement="rightTop" content={Preview} trigger="hover">
      {body}
    </Popover>
  ) : (
    <>{body}</>
  );
});
TemplateMenuItem.displayName = 'TemplateMenuItem';

interface TemplateMenuProps {
  style?: React.CSSProperties;
}
export const TemplateMenu: React.FC<TemplateMenuProps> = React.memo((props) => {
  const availableCupsName = useAvailableCupsName();

  return (
    <div className="saucer-template-menu" style={props.style}>
      {availableCupsName.map((cupName) => {
        const cup = findCup(cupName);
        return cup && <TemplateMenuItem key={cup.name} cup={cup} />;
      })}
    </div>
  );
});
TemplateMenu.displayName = 'TemplateMenu';
