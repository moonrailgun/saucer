import { ASTNode, regCup, saucerStoreHelper } from '@saucerjs/core';
import { CSSEditor } from '@saucerjs/css-editor';
import React from 'react';
import { Checkbox, Input, InputNumber, Tabs } from 'antd';
import {
  useTeaAttrsContext,
  TextEditorField,
  renderChildren,
} from '@saucerjs/editor';
import shortid from 'shortid';

regCup({
  name: 'Container',
  displayName: '容器组件',
  desc: '这是一个基本容器',
  type: 'container',
  preview: () => {
    return <div>容器组件</div>;
  },
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

regCup({
  name: 'Input',
  displayName: '输入框',
  type: 'leaf',
  render: () => {
    const { currentTeaAttrs, setCurrentTeaAttrs } = useTeaAttrsContext();

    return (
      <Input
        value={currentTeaAttrs['text']}
        onChange={(e) => setCurrentTeaAttrs({ text: e.target.value })}
      />
    );
  },
});

regCup({
  name: 'InputNumber',
  displayName: '数字输入框',
  type: 'leaf',
  render: () => {
    const { currentTeaAttrs, setCurrentTeaAttrs } = useTeaAttrsContext();

    return (
      <InputNumber
        value={currentTeaAttrs['num']}
        onChange={(val) => setCurrentTeaAttrs({ num: val })}
      />
    );
  },
});

regCup({
  name: 'Checkbox',
  displayName: '复选框',
  type: 'leaf',
  render: () => {
    const { currentTeaAttrs, setCurrentTeaAttrs } = useTeaAttrsContext();

    const label = currentTeaAttrs['label'] ?? 'label';

    return (
      <Checkbox
        checked={currentTeaAttrs['select']}
        onChange={(val) => setCurrentTeaAttrs({ select: val })}
      >
        {label}
      </Checkbox>
    );
  },
  editor: () => {
    return (
      <>
        <TextEditorField field="label" label="标签" />
      </>
    );
  },
});

interface CupTabsPanelItem {
  nodeId: string;
  children: ASTNode[];
}
regCup({
  name: 'Tabs',
  displayName: '复选框',
  type: 'container',
  defaultAttrs: () => {
    return {
      _panel: [
        {
          nodeId: shortid(),
          children: [],
        },
        {
          nodeId: shortid(),
          children: [],
        },
      ] as CupTabsPanelItem[],
    };
  },
  render: ({ attrs }) => {
    const panels: CupTabsPanelItem[] = attrs['_pane'] ?? [];
    return (
      <Tabs>
        {panels.map((panel) => (
          <Tabs.TabPane key={panel.nodeId}>
            {renderChildren(panel.children ?? [])}
          </Tabs.TabPane>
        ))}
      </Tabs>
    );
  },
  editor: () => {
    return (
      <>
        <TextEditorField field="label" label="当前面板Key" />
      </>
    );
  },
});

saucerStoreHelper.setAvailableCup([
  'Container',
  'Button',
  'Input',
  'InputNumber',
  'Checkbox',
]);
