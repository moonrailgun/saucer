import React from 'react';

export const RenderWrapper: React.FC = React.memo((props) => {
  return <div className="saucer-render-wrapper">{props.children}</div>;
});
RenderWrapper.displayName = 'RenderWrapper';
