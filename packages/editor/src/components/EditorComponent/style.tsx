import React from 'react';

interface Props {
  label?: string;
  style?: React.CSSProperties;
}
export const EditorComponentContainer: React.FC<Props> = React.memo((props) => {
  return (
    <div
      style={{
        padding: 8,
        display: 'flex',
        alignItems: 'center',
        ...props.style,
      }}
    >
      <div>{props.label}:&nbsp;</div>
      <div style={{ flex: 1 }}>{props.children}</div>
    </div>
  );
});
EditorComponentContainer.displayName = 'EditorComponentContainer';
