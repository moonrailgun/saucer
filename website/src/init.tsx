import { regCup, saucerStoreHelper } from '@saucer/core';
import React from 'react';

regCup({
  name: 'Container',
  desc: '这是一个基本容器',
  type: 'container',
  render: (props) => {
    return <div>{props.children}</div>;
  },
});

regCup({
  name: 'Button',
  desc: '这是一个按钮',
  type: 'leaf',
  render: () => {
    return <button>按钮</button>;
  },
});

saucerStoreHelper.setCupAvailable('Container');
saucerStoreHelper.setCupAvailable('Button');
