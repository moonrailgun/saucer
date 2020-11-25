import React from 'react';
import { findCup, useAvailableCupsName, CupType } from '@saucerjs/core';
import { useDrag } from 'react-dnd';
import { TemplateItemSymbol } from './symbol';
import type { DragObject } from './types';

const TemplateMenuItem: React.FC<{
  cup: CupType;
}> = React.memo((props) => {
  const { cup } = props;
  const [{ opacity }, dragRef] = useDrag({
    item: { type: TemplateItemSymbol, name: cup.name } as DragObject,
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div
      className="saucer-template-menu__item"
      ref={dragRef}
      style={{ opacity }}
    >
      <div>{cup.displayName ?? cup.name}</div>
      {cup.desc && <small>{cup.desc}</small>}
    </div>
  );
});
TemplateMenuItem.displayName = 'TemplateMenuItem';

export const TemplateMenu: React.FC = React.memo(() => {
  const availableCupsName = useAvailableCupsName();

  return (
    <div className="saucer-template-menu">
      Saucer Layout Menu:{' '}
      {availableCupsName.map((cupName) => {
        const cup = findCup(cupName);
        return cup && <TemplateMenuItem key={cup.name} cup={cup} />;
      })}
    </div>
  );
});
TemplateMenu.displayName = 'TemplateMenu';
