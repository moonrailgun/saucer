import React from 'react';
import { Previewer } from './Previewer';
import { SaucerEditorProvider } from './Provider';
import { TemplateMenu } from './TemplateMenu';
import { Viewport } from './ViewPort';

/**
 * Default Saucer Editor
 * Also you can compose it by you self
 */
export const SaucerEditor: React.FC = React.memo(() => {
  return (
    <SaucerEditorProvider>
      <div className="default-saucer-editor">
        <TemplateMenu />
        <Viewport />
      </div>
    </SaucerEditorProvider>
  );
});
SaucerEditor.displayName = 'SaucerEditor';
