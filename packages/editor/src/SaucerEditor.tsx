import React from 'react';
import { Previewer } from './Previewer';
import { SaucerEditorProvider } from './Provider';
import { TemplateMenu } from './TemplateMenu';

/**
 * Default Saucer Editor
 * Also you can compose it by you self
 */
export const SaucerEditor: React.FC = React.memo(() => {
  return (
    <SaucerEditorProvider>
      <Previewer />
      <TemplateMenu />
    </SaucerEditorProvider>
  );
});
SaucerEditor.displayName = 'SaucerEditor';
