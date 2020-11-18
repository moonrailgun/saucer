import React from 'react';
import { useCups } from '@saucer/core';
import { CupType } from '@saucer/core/lib/redux/slice/cups';

const TemplateMenuItem: React.FC<{
  cup: CupType;
}> = React.memo((props) => {
  const { cup } = props;

  return (
    <div>
      <div>{cup.displayName ?? cup.name}</div>
      {cup.desc && <small>{cup.desc}</small>}
    </div>
  );
});
TemplateMenuItem.displayName = 'TemplateMenuItem';

export const TemplateMenu: React.FC = React.memo(() => {
  const cups = useCups();

  return (
    <div>
      Saucer Layout Menu:{' '}
      {cups.map((cup) => (
        <TemplateMenuItem cup={cup} />
      ))}
    </div>
  );
});
TemplateMenu.displayName = 'TemplateMenu';
