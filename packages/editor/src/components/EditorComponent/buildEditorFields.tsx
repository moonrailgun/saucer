import type { ASTAttrs } from '@saucerjs/core';
import React from 'react';
import { useTeaAttrsContext } from '../../context/TeaAttrsContext';
import { EditorComponentContainer } from './style';

type EditorFieldBuilderFn<T extends Record<string, any>> = (
  options: {
    field: string;
    label: string;
    currentTeaAttrs: ASTAttrs;
    setCurrentTeaAttrs: (newAttrs: ASTAttrs) => void;
  } & T
) => React.ReactNode;

/**
 * Generate Editor Field Component with function
 * @param name Component Name
 * @param fn Component Builder Fn
 * @returns A Saucer Editor Field
 */

export function buildEditorFields<T extends Record<string, any> = {}>(
  name: string,
  fn: EditorFieldBuilderFn<T>
) {
  const SaucerEditorField: React.FC<
    {
      label?: string;
      field: string; // Modified Fields
    } & T
  > = React.memo((props) => {
    const { field, label = '', children, ...custom } = props;
    const { currentTeaAttrs, setCurrentTeaAttrs } = useTeaAttrsContext();

    return (
      <EditorComponentContainer label={label}>
        {fn({
          ...((custom as any) as T), // TODO: I have not a good idea to create this type
          field,
          label,
          currentTeaAttrs,
          setCurrentTeaAttrs,
        })}
      </EditorComponentContainer>
    );
  });
  SaucerEditorField.displayName = `SaucerEditorField(${name})`;

  return SaucerEditorField;
}
