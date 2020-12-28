import { regCup, saucerStoreHelper } from '@saucerjs/core';
import { CSSEditor } from '@saucerjs/css-editor';
import React from 'react';

regCup({
  name: 'Container',
  displayName: '容器组件',
  desc: '这是一个基本容器',
  type: 'container',
  render: (props) => {
    return (
      <div style={{ minHeight: 100, ...props.attrs.style }}>
        {props.children}
      </div>
    );
  },
  editor: () => {
    return (
      <div>
        <CSSEditor />
      </div>
    );
  },
});

regCup({
  name: 'Button',
  displayName: '按钮组件',
  desc: '这是一个按钮',
  type: 'leaf',
  render: ({ attrs }) => {
    return <button style={attrs.style}>按钮</button>;
  },
  editor: () => {
    return (
      <div>
        <CSSEditor />
      </div>
    );
  },
});

saucerStoreHelper.setAvailableCup(['Container', 'Button']);
