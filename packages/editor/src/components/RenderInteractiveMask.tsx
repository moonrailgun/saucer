import React from 'react';

/**
 * A Component which forbid interactive with children
 */

export const RenderInteractiveMask: React.FC = React.memo((props) => {
  return <div className="render-interactive-mask">{props.children}</div>;
});
RenderInteractiveMask.displayName = 'RenderInteractiveMask';
