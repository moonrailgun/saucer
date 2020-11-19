import React from 'react';

interface DropIndicatorProps {
  name: string;
}
export const DropIndicator: React.FC<DropIndicatorProps> = React.memo(
  (props) => {
    return <div className="saucer-drop-indicator">{props.name}</div>;
  }
);
DropIndicator.displayName = 'DropIndicator';
