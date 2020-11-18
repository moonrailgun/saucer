import React from 'react';
import { Previewer } from './Previewer';
import { TemplateMenu } from './TemplateMenu';
import { SaucerProvider } from '@saucer/core';

/**
 * Default Saucer Editor
 * Also you can compose it by you self
 */
export const SaucerEditor: React.FC = React.memo(() => {
  return (
    <SaucerProvider>
      <Previewer />
      <TemplateMenu />
    </SaucerProvider>
  );
});
SaucerEditor.displayName = 'SaucerEditor';
