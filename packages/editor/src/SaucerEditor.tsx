import React from 'react';
import { Inspector } from './Inspector';
import { TemplateMenu } from './TemplateMenu';
import { TreeView } from './TreeView';
import { Viewport } from './Viewport';
import SplitPane from 'react-split-pane';

/**
 * Default Saucer Editor
 * Also you can compose it by you self
 */

interface SaucerEditorProps {
  cupNames?: string[];
}
export const SaucerEditor: React.FC<SaucerEditorProps> = React.memo((props) => {
  return (
    <>
      <SplitPane split="vertical" minSize={180}>
        <TemplateMenu cupNames={props.cupNames} />

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
    </>
  );
});
SaucerEditor.displayName = 'SaucerEditor';
