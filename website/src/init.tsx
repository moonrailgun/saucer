import {
  ASTNode,
  getNodePathById,
  regCup,
  useAST,
  useASTDispatchAction,
  useCurrentTeaId,
} from '@saucerjs/core';
import { CSSEditor } from '@saucerjs/css-editor';
import React, { useCallback, useState } from 'react';
import { Button, Checkbox, Divider, Input, InputNumber, Tabs } from 'antd';
import {
  useTeaAttrsContext,
  renderChildren,
  useTeaRenderOptionsContext,
  buildEditorFields,
} from '@saucerjs/editor';
import shortid from 'shortid';

const TextEditorField = buildEditorFields(
  'Input',
  ({ label, field, currentTeaAttrs, setCurrentTeaAttrs }) => {
    return (
      <Input
        placeholder={label}
        value={currentTeaAttrs[field]}
        onChange={(e) =>
          setCurrentTeaAttrs({
            [field]: e.target.value,
          })
        }
      />
    );
  }
);

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
        checked={currentTeaAttrs['selected']}
        onChange={(e) => setCurrentTeaAttrs({ selected: e.target.checked })}
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
  render: ({ node, path }) => {
    const { currentTeaAttrs, setCurrentTeaAttrs } = useTeaAttrsContext();
    const options = useTeaRenderOptionsContext();

    const handleChange = useCallback((activeKey) => {
      setCurrentTeaAttrs({
        activePanelNodeId: activeKey,
      });
    }, []);

    if (node.type === 'leaf') {
      console.error('[Tabs]', 'Expect node type is `container`');
      return null;
    }

    const tabPanels = node.children.filter(
      (child) => child.cupName === 'TabPanel'
    );
    if (tabPanels.length === 0) {
      return (
        <div
          style={{
            height: 80,
            color: '#ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 18,
          }}
        >
          请在设置面板中增加标签页
        </div>
      );
    }

    return (
      <Tabs
        activeKey={currentTeaAttrs['activePanelNodeId']}
        onChange={handleChange}
      >
        {renderChildren(tabPanels, path, options).map(
          (el: React.ReactNode, i: number) => {
            const sub = node.children[i];
            const attrs = sub.attrs ?? {};

            return (
              <Tabs.TabPane key={sub.id} tab={attrs.name ?? sub.id}>
                {el}
              </Tabs.TabPane>
            );
          }
        )}
      </Tabs>
    );
  },
  editor: () => {
    const [newTabName, setNewTabName] = useState('');
    const { dispatchAppendChildren } = useASTDispatchAction();
    const currentTeaId = useCurrentTeaId();
    const ast = useAST();

    const handleAppend = useCallback(() => {
      if (typeof currentTeaId !== 'string') {
        console.warn('[Tabs]', 'Cannot get currentTeaId');
        return;
      }

      const currentPath = getNodePathById(ast, currentTeaId);
      if (currentPath === false) {
        console.warn('[Tabs]', 'Cannot get currentPath');
        return;
      }
      setNewTabName('');
      dispatchAppendChildren(currentPath, 'container', shortid(), 'TabPanel', {
        name: newTabName,
      });
    }, [ast, newTabName, currentTeaId, dispatchAppendChildren]);

    return (
      <>
        <TextEditorField field="activePanelNodeId" label="当前面板Key" />

        <Divider>新增面板</Divider>
        <Input
          placeholder="面板名"
          value={newTabName}
          onChange={(e) => setNewTabName(e.target.value)}
        />
        <Button onClick={handleAppend}>新增</Button>
      </>
    );
  },
});

regCup({
  name: 'TabPanel',
  type: 'container',
  render: ({ children }) => {
    if (Array.isArray(children) && children.length === 0) {
      return (
        <div style={{ padding: 20, textAlign: 'center' }}>请在此处拖入组件</div>
      );
    }

    return <div>{children}</div>;
  },
  editor: () => {
    return (
      <>
        <TextEditorField field="name" label="当前面板名" />
      </>
    );
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
