import React from 'react';

export const RenderWrapper: React.FC = React.memo((props) => {
  return <div>{props.children}</div>;
});
RenderWrapper.displayName = 'RenderWrapper';
