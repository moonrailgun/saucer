import React, { useCallback, useState } from 'react';
import EditorList, { EditorListChangeState } from 'rc-editor-list';
import _get from 'lodash/get';
import { parseStyleStringToReactStyle } from './utils';

export const CSSEditor: React.FC = React.memo(() => {
  const [dom, setDom] = useState<HTMLDivElement | null>(null);

  const handleChange = useCallback((state: EditorListChangeState) => {
    const styleObj = parseStyleStringToReactStyle(
      _get(state, ['cssValue', '', 'css', 'default'])
    );

    // TODO: write to tea
    console.log(styleObj);
  }, []);

  return (
    <div>
      <div ref={setDom}></div>

      {dom && (
        <EditorList
          editorElem={dom}
          onChange={handleChange}
          useClassName={false}
          cssToDom={false}
        />
      )}
    </div>
  );
});
CSSEditor.displayName = 'CSSEditor';
