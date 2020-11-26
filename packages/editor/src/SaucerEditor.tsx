import React from 'react';
import { Inspector } from './Inspector';
import { Previewer } from './Previewer';
import { SaucerEditorProvider } from './Provider';
import { TemplateMenu } from './TemplateMenu';
import { TreeView } from './TreeView';
import { Viewport } from './ViewPort';
import SplitPane from 'react-split-pane';

/**
 * Default Saucer Editor
 * Also you can compose it by you self
 */
export const SaucerEditor: React.FC = React.memo(() => {
  return (
    <SaucerEditorProvider>
      <SplitPane split="vertical" minSize={180}>
        <TemplateMenu />

        <SplitPane split="vertical" primary="second" minSize={240}>
          <Viewport />

          <SplitPane
            split="horizontal"
            minSize={240}
            pane2Style={{ overflow: 'auto' }}
          >
            <TreeView />
            <Inspector />
          </SplitPane>
        </SplitPane>
      </SplitPane>
    </SaucerEditorProvider>
  );
});
SaucerEditor.displayName = 'SaucerEditor';
