import { saucerStoreHelper } from '@saucer/core';
import React from 'react';

saucerStoreHelper.regCup({
  name: 'Container',
  desc: '这是一个基本容器',
  type: 'container',
  render: (props) => {
    return <div>{props.children}</div>;
  },
});

saucerStoreHelper.regCup({
  name: 'Button',
  desc: '这是一个按钮',
  type: 'leaf',
  render: () => {
    return <button>按钮</button>;
  },
});
