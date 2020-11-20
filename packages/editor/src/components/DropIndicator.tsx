import { findCup } from '@saucer/core';
import React, { useMemo } from 'react';

interface DropIndicatorProps {
  name: string;
}
export const DropIndicator: React.FC<DropIndicatorProps> = React.memo(
  (props) => {
    const { name } = props;
    const displayName = useMemo(() => {
      return findCup(name)?.displayName ?? name;
    }, [name]);

    return <div className="saucer-drop-indicator">{displayName}</div>;
  }
);
DropIndicator.displayName = 'DropIndicator';
