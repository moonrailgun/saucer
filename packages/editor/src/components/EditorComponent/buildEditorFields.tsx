import type { ASTAttrs } from '@saucerjs/core';
import React from 'react';
import { useTeaAttrsContext } from '../../context/TeaAttrsContext';
import { EditorComponentContainer } from './style';

type EditorFieldBuilderFn = (options: {
  field: string;
  label: string;
  currentTeaAttrs: ASTAttrs;
  setCurrentTeaAttrs: (newAttrs: ASTAttrs) => void;
}) => React.ReactNode;

/**
 * Generate Editor Field Component with function
 * @param name Component Name
 * @param fn Component Builder Fn
 * @returns A Saucer Editor Field
 */
export function buildEditorFields(name: string, fn: EditorFieldBuilderFn) {
  const SaucerEditorField: React.FC<{
    label?: string;
    field: string; // 变更的字段名
  }> = React.memo((props) => {
    const { field, label = '' } = props;
    const { currentTeaAttrs, setCurrentTeaAttrs } = useTeaAttrsContext();

    return (
      <EditorComponentContainer label={label}>
        {fn({ field, label, currentTeaAttrs, setCurrentTeaAttrs })}
      </EditorComponentContainer>
    );
  });
  SaucerEditorField.displayName = `SaucerEditorField(${name})`;

  return SaucerEditorField;
}
