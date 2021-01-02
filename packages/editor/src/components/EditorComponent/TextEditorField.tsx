import React from 'react';
import Input from 'antd/es/input/Input';
import { useTeaAttrsContext } from '../../context/TeaAttrsContext';
import { EditorComponentContainer } from './style';

export const TextEditorField: React.FC<{
  label?: string;
  field: string; // 变更的字段名
}> = React.memo((props) => {
  const { field, label = '' } = props;
  const { currentTeaAttrs, setCurrentTeaAttrs } = useTeaAttrsContext();

  return (
    <EditorComponentContainer label={label}>
      <Input
        placeholder={label}
        value={currentTeaAttrs[field]}
        onChange={(e) =>
          setCurrentTeaAttrs({
            [field]: e.target.value,
          })
        }
      />
    </EditorComponentContainer>
  );
});
TextEditorField.displayName = 'TextEditorField';
