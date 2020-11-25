import { regCup, saucerStoreHelper } from '@saucer/core';
import React from 'react';

regCup({
  name: 'Container',
  displayName: '容器组件',
  desc: '这是一个基本容器',
  type: 'container',
  render: (props) => {
    return <div style={{ minHeight: 100 }}>{props.children}</div>;
  },
  editor: () => {
    return <div>这里是容器的属性编辑器</div>;
  },
});

regCup({
  name: 'Button',
  displayName: '按钮组件',
  desc: '这是一个按钮',
  type: 'leaf',
  render: () => {
    return <button>按钮</button>;
  },
  editor: () => {
    return <div>这里是按钮的属性编辑器</div>;
  },
});

saucerStoreHelper.setCupAvailable('Container');
saucerStoreHelper.setCupAvailable('Button');
