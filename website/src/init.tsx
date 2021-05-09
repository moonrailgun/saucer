import { ASTNode, regCup } from '@saucerjs/core';
import { CSSEditor } from '@saucerjs/css-editor';
import React, { useCallback } from 'react';
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
  name: string;
  children: ASTNode[];
}
regCup({
  name: 'Tabs',
  displayName: '标签页',
  type: 'container',
  desc: '多标签页组件',
  disableDropEvent: true,
  defaultAttrs: () => {
    return {
      activePanelNodeId: shortid(),
    };
  },
  render: ({ node, path, attrs, children }) => {
    const { currentTeaAttrs, setCurrentTeaAttrs } = useTeaAttrsContext();

    const handleChange = useCallback((activeKey) => {
      setCurrentTeaAttrs({
        activePanelNodeId: activeKey,
      });
    }, []);

    if (node.type === 'leaf') {
      console.error('[Tabs]', 'Expect node type is `container`');
      return null;
    }

    return (
      <Tabs
        activeKey={currentTeaAttrs['activePanelNodeId']}
        onChange={handleChange}
      >
        {renderChildren(
          node.children.filter((child) => child.cupName === 'TabPanel'),
          path,
          { hasWrapper: true }
        ).map((el: React.ReactNode, i) => {
          const sub = node.children[i];

          return (
            <Tabs.TabPane key={sub.id} tab={sub.id}>
              {el}
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    );
  },
  editor: () => {
    return (
      <>
        <TextEditorField field="activePanelNodeId" label="当前面板Key" />
      </>
    );
  },
});

regCup({
  name: 'TabPanel',
  type: 'container',
  render: ({ children }) => {
    console.log('children', children);
    if (Array.isArray(children) && children.length === 0) {
      return (
        <div style={{ padding: 20, textAlign: 'center' }}>请在此处拖入组件</div>
      );
    }

    return <div>{children}</div>;
  },
});

export const availableCup = [
  'Container',
  'Button',
  'Input',
  'InputNumber',
  'Checkbox',
  'Tabs',
];
